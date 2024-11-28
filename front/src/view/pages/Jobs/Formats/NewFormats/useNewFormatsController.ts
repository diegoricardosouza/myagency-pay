import { useAuth } from "@/app/hooks/useAuth";
import { jobsService } from "@/app/services/jobs";
import { JobParams } from "@/app/services/jobs/create";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  site: z.string()
    .optional()
    .nullable(),
  page: z.string()
    .optional()
    .nullable(),
  format: z.string()
    .optional()
    .nullable(),
  other_formats: z.string()
    .optional()
    .nullable(),
  phrase: z.string()
    .optional()
    .nullable(),
  content: z.string()
    .min(1, 'Conteúdo é obrigatório'),
  obs: z.string()
    .optional()
    .nullable(),
  files: z.array(z.any()).optional().nullable(),
});

type FormData = z.infer<typeof schema>

export function useNewFormatsController() {
  const { user } = useAuth();
  const { formats } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const typeFormat = formats === 'atualizacoes' ? 'Atualizações' : (formats === 'midia-digital' ? 'Mídia Digital' : (formats === 'apresentacoes' ? 'Apresentações' : 'Impresso'));

  const {
    register,
    handleSubmit: hookFormSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: JobParams) => {
      return jobsService.create(data);
    }
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        type: typeFormat
      });

      queryClient.invalidateQueries({ queryKey: ['jobs', 'jobs-count'] });
      queryClient.invalidateQueries({ queryKey: ['users', 'me'] });
      toast.success('Solicitação cadastrada com sucesso!');
      reset();
      navigate("/solicitacoes");
    } catch (error) {
      toast.error('Erro ao cadastrar a solicitação');
    }
  });

  return {
    register,
    control,
    reset,
    errors,
    handleSubmit,
    formats,
    isPending,
    user
  }
}
