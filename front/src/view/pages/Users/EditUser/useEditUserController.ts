import { ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE } from "@/app/config/constants";
import { useAuth } from "@/app/hooks/useAuth";
import { usersService } from "@/app/services/usersService";
import { UpdateUserParams } from "@/app/services/usersService/update";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string()
    .min(1, 'Nome é obrigatório'),
  company: z.string()
    .min(1, 'Empresa é obrigatório'),
  responsible: z.string()
    .min(1, 'Responsável é obrigatório'),
  email: z.string()
    .min(1, 'E-mail é obrigatório')
    .email('Informe um e-mail válido'),
  whatsapp: z.string()
    .min(1, 'Whatsapp é obrigatório'),
  address: z.string()
    .min(1, 'Endereço é de preenchimento obrigatório.'),
  zipcode: z.string()
    .min(1, 'CEP é de preenchimento obrigatório.'),
  city: z.string()
    .min(1, 'Cidade é de preenchimento obrigatório.'),
  state: z.string()
    .min(1, 'Estado é de preenchimento obrigatório.'),
  number: z.string()
    .min(1, 'Número é de preenchimento obrigatório.'),
  neighborhood: z.string()
    .min(1, 'Bairro é de preenchimento obrigatório.'),
  cpf: z.string()
    .min(1, 'CPF é de preenchimento obrigatório.'),
  credits: z.string(),
    // .refine((cpf) => isValidCPF(cpf), { message: "CPF inválido" }),
  password: z.string()
    .min(3, "A senha deve conter pelo menos 3 dígitos")
    .optional()
    .nullable()
    .or(z.literal(null)),
  logo: z.instanceof(FileList)
    .transform(list => list.length > 0 ? list.item(0) : null)
    .refine((file) => {
      return file === null || file.size <= MAX_FILE_SIZE;
    }, `O tamanho máximo da imagem é 3MB.`)
    .refine(
      (file) => file === null || ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
      "Somente .jpg, .jpeg, .png and .webp são formatos suportados."
    )
    .optional()
    .or(z.literal('')),
  level: z.string()
    .min(1, 'Nível é obrigatório')
});

type FormData = z.infer<typeof schema>

export function useEditUserController() {
  const [logoTemp, setLogoTemp] = useState<string | undefined>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { user } = useAuth();
  const [zipcodeValid, setZipcodeValid] = useState('');

  const { data: userEditData, isLoading } = useQuery({
    queryKey: ['editUser', id],
    staleTime: 0,
    queryFn: async () => {
      try {
        const response = await usersService.getById(id!);
        return response;
      } catch (error) {
        toast.error('Usuário não encontrado');
        navigate("/usuarios");
      }
    }
  });

  const {
    register,
    handleSubmit: hookFormSubmit,
    control,
    setValue,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });
  const zipcode = watch("zipcode");

  // Definindo valores padrão após a obtenção dos dados do usuário
  useEffect(() => {
    if (userEditData?.data) {
      setValue("name", userEditData?.data?.name);
      setValue("company", userEditData?.data?.company);
      setValue("email", userEditData?.data?.email);
      setValue("level", userEditData?.data?.level);
      setValue("responsible", userEditData?.data?.responsible);
      setValue("whatsapp", userEditData?.data?.whatsapp);
      setValue("cpf", userEditData?.data?.cpf);
      setValue("credits", String(userEditData?.data?.credits));
      setValue("address", userEditData?.data?.address);
      setValue("zipcode", userEditData?.data?.zipcode);
      setValue("city", userEditData?.data?.city);
      setValue("state", userEditData?.data?.state);
      setValue("neighborhood", userEditData?.data?.neighborhood);
      setValue("number", userEditData?.data?.number);
      setValue("password", null);
      setLogoTemp(userEditData?.data.logo);
    }
  }, [userEditData, setValue]);

  // Chamada para ViaCEP
  useEffect(() => {
    if (zipcode && zipcode.length < 8) {
      setValue("address", "");
      setValue("city", "");
      setValue("state", "");
      setValue("neighborhood", "");
      setValue("number", "");
    }
    const fetchAddress = async (cep: string) => {
      setZipcodeValid("");

      if (cep?.length === 8) { // Formato completo do CEP
        try {
          const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
          if (!data.erro) {
            setValue("neighborhood", data.bairro);
            setValue("city", data.localidade);
            setValue("state", data.uf);
            setValue("address", data?.logradouro);
          } else {
            console.error("CEP inválido.");
            setZipcodeValid("CEP inválido.");
          }
        } catch (error) {
          console.error("Erro ao buscar o endereço:", error);
        }
      }
    };

    fetchAddress(zipcode);
  }, [zipcode, setValue]);

  function changeLogo(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setLogoTemp(URL.createObjectURL(e.target.files[0]));
    }
  }

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: UpdateUserParams) => {
      let dataFilter;
      if (user?.data.level === 'CLIENTE') {
        dataFilter = {
          ...data,
          email: user!.data.email,
          cpf: user!.data.cpf
        }
      } else {
        dataFilter = data
      }

      return usersService.update(dataFilter);
    }
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      if(id) {
        await mutateAsync({
          ...data,
          id,
        });
      }

      queryClient.invalidateQueries({ queryKey: ['users', 'me'] });
      // queryClient.invalidateQueries({ queryKey: ['editUser'] });
      toast.success('Usuário atualizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao cadastrar o usuário');
    }
  });

  return {
    errors,
    register,
    handleSubmit,
    control,
    isPending,
    isLoading,
    linkLogo: logoTemp,
    changeLogo,
    id,
    zipcodeValid,
    user
  }
}
