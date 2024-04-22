import { useAuth } from "@/app/hooks/useAuth";
import { commentsService } from "@/app/services/commentsService";
import { CommentsParams } from "@/app/services/commentsService/create";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  content: z.string().min(1, 'Comentário é obrigatório'),
  files: z.array(z.any()).optional().nullable(),
});

type FormData = z.infer<typeof schema>

export function useCreateCommentController() {
  const { id } = useParams();
  const { user } = useAuth();
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

  const {
    isPending: isLoadingCreateComment,
    mutateAsync
  } = useMutation({
    mutationFn: async (data: CommentsParams) => {
      return commentsService.create(data);
    }
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        job_id: id!,
        user_id: user!.data.id
      });
      queryClient.invalidateQueries({ queryKey: ['viewjob'] });
      toast.success('Comentário cadastrado com sucesso!');
      reset();
      // navigate(0);
    } catch (error) {
      toast.error('Erro ao cadastrar o comentário!');
    }
  });

  return {
    control,
    isLoadingCreateComment,
    register,
    handleSubmit,
    errors
  }
}
