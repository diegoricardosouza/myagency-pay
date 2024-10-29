import { ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE } from "@/app/config/constants";
import { usersService } from "@/app/services/usersService";
import { UpdateUserParams } from "@/app/services/usersService/update";
import { isValidCPF } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  cpf: z.string()
    .min(1, 'CPF é de preenchimento obrigatório.')
    .refine((cpf) => isValidCPF(cpf), { message: "CPF inválido" }),
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
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

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
      setValue("password", null);
      setLogoTemp(userEditData?.data.logo);
    }
  }, [userEditData, setValue]);

  function changeLogo(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setLogoTemp(URL.createObjectURL(e.target.files[0]));
    }
  }

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: UpdateUserParams) => {
      return usersService.update(data);
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

      queryClient.invalidateQueries({ queryKey: ['editUser'] });
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
    changeLogo
  }
}
