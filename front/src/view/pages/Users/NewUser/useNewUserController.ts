import { ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE } from "@/app/config/constants";
import { usersService } from "@/app/services/usersService";
import { UserParams } from "@/app/services/usersService/create";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
    .min(3, 'A senha deve conter pelo menos 3 dígitos'),
  logo: z.instanceof(FileList)
    .transform(list => list.item(0)!)
    .refine((files) => {
      return files?.size <= MAX_FILE_SIZE;
    }, `O tamanho máximo da imagem é 3MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.type),
      "Somente .jpg, .jpeg, .png and .webp são formatos suportados."
    ),
  level: z.string()
    .min(1, 'Nível é obrigatório'),
});

type FormData = z.infer<typeof schema>

export function useNewUserController() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [zipcodeValid, setZipcodeValid] = useState('');

  const {
    register,
    handleSubmit: hookFormSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });
  const zipcode = watch("zipcode"); // Observa alterações no CEP

  // Chamada para ViaCEP
  useEffect(() => {
    if (zipcode) {
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

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: UserParams) => {
      return usersService.create(data);
    }
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        credits: data.credits ? Number(data.credits) : 0,
      });

      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Usuário cadastrado com sucesso!');
      reset();
      navigate("/usuarios");
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
    zipcodeValid
  }
}
