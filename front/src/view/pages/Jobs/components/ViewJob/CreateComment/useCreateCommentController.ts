import { useAuth } from "@/app/hooks/useAuth";
import { commentsService } from "@/app/services/commentsService";
import { CommentsParams } from "@/app/services/commentsService/create";
import { jobsService } from "@/app/services/jobs";
import { UpdateJobParams } from "@/app/services/jobs/update";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
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
  const [openModalComment, setOpenModalComment] = useState(false);

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

  const {
    mutateAsync: mutateChangeStatus
  } = useMutation({
    mutationFn: async (data: UpdateJobParams) => {
      return jobsService.update(data);
    }
  });

  function openCommentModal() {
    setOpenModalComment(true);
  }

  function closeCommentModal() {
    setOpenModalComment(false);
  }

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        job_id: id!,
        user_id: user!.data.id
      });

      if(user?.data.level === 'CLIENTE') {
        await mutateChangeStatus({
          id: id!,
          status: "changing"
        });
        queryClient.invalidateQueries({ queryKey: ['viewjob'] });
        reset();
      }

      if (user?.data.level === 'ADMIN') {
        await mutateChangeStatus({
          id: id!,
          status: "approving"
        });
        queryClient.invalidateQueries({ queryKey: ['viewjob'] });
        reset();
      }

      queryClient.invalidateQueries({ queryKey: ['viewjob'] });
      if (user?.data.level === 'CLIENTE') {
        toast.success('Comentário cadastrado com sucesso!');
      } else {
        openCommentModal();
      }

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
    errors,
    id,
    openModalComment,
    closeCommentModal
  }
}
