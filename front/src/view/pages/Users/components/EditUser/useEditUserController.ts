import { ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE } from "@/app/config/constants";
import { plansService } from "@/app/services/plansService";
import { usersService } from "@/app/services/usersService";
import { UpdateUserParams } from "@/app/services/usersService/update";
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
  day: z.string()
    .min(1, 'Dia de Corte é obrigatório'),
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
    .min(1, 'Nível é obrigatório'),
  plan_id: z.string()
    .min(1, 'Plano é obrigatório'),
});

type FormData = z.infer<typeof schema>

export function useEditUserController() {
  const [logoTemp, setLogoTemp] = useState<string | undefined>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();

  // Obtendo os planos
  const { data, isLoading: isLoadingPlans } = useQuery({
    queryKey: ['Editplans'],
    staleTime: 0,
    queryFn: () => plansService.getAll(),
  });

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
  const [planId, setPlanId] = useState<string>(userEditData?.data?.plan?.id as string)

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
    setPlanId(userEditData?.data?.plan?.id as string)
    if (userEditData?.data) {
      setValue("name", userEditData?.data?.name);
      setValue("company", userEditData?.data?.company);
      setValue("day", String(userEditData?.data?.day));
      setValue("email", userEditData?.data?.email);
      setValue("level", userEditData?.data?.level);
      setValue("responsible", userEditData?.data?.responsible);
      setValue("whatsapp", userEditData?.data?.whatsapp);
      setValue("plan_id", planId);
      setValue("password", null);
      setLogoTemp(userEditData?.data.logo);
    }
  }, [userEditData, setValue, planId]);

  function changeLogo(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.files);
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
      console.log(data);

      if(id) {
        await mutateAsync({
          ...data,
          day: Number(data.day),
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
    plans: data?.data ?? [],
    isLoading,
    isLoadingPlans,
    linkLogo: logoTemp,
    changeLogo
  }
}
