import { ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE } from "@/app/config/constants";
import { plansService } from "@/app/services/plansService";
import { usersService } from "@/app/services/usersService";
import { UserParams } from "@/app/services/usersService/create";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  day: z.string()
    .min(1, 'Dia de Corte é obrigatório'),
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
  plan_id: z.string()
    .min(1, 'Plano é obrigatório'),
});

type FormData = z.infer<typeof schema>

export function useNewUserController() {
  const dayNow = new Date().getDate();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit: hookFormSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { data, isFetching } = useQuery({
    queryKey: ['plans'],
    queryFn: () => plansService.getAll(),
  })

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: UserParams) => {
      return usersService.create(data);
    }
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        day: Number(data.day)
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
    dayNow,
    errors,
    register,
    handleSubmit,
    control,
    isPending,
    plans: data?.data ?? [],
    isFetching,
  }
}
