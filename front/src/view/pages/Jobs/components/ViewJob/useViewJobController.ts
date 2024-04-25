import { useAuth } from "@/app/hooks/useAuth";
import { jobsService } from "@/app/services/jobs";
import { UpdateJobParams } from "@/app/services/jobs/update";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";


export function useViewJobController() {
  const [changingStatus, setChangingStatus] = useState(false);
  const [approvingStatus, setApprovingStatus] = useState(false);
  const [approvedStatus, setApprovedStatus] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    handleSubmit: hookFormSubmit
  } = useForm();

  const { data: jobData, isLoading } = useQuery({
    queryKey: ['viewjob', id],
    staleTime: 0,
    queryFn: async () => {
      try {
        const response = await jobsService.getById(id!);
        return response;
      } catch (error) {
        toast.error('Solicitação não encontrada');
        navigate("/solicitacoes");
      }
    }
  });

  const {
    isPending: isChangeStatus,
    mutateAsync
  } = useMutation({
    mutationFn: async (data: UpdateJobParams) => {
      return jobsService.update(data);
    }
  });

  // console.log("user:", user!.data.id);


  const handleChangingStatus = hookFormSubmit(async () => {
    try {
      setChangingStatus(true);
      await mutateAsync({
        id: id!,
        status: "changing"
      });
      queryClient.invalidateQueries({ queryKey: ['viewjob', 'jobs-all'] });
      toast.success('Enviado para alteração!');
      setChangingStatus(false);
    } catch (error) {
      toast.error('Erro ao alterar status!');
    }
  });

  const handleApprovingStatus = hookFormSubmit(async () => {
    try {
      setApprovingStatus(true);
      await mutateAsync({
        id: id!,
        status: "approving"
      });
      queryClient.invalidateQueries({ queryKey: ['viewjob', 'jobs-all'] });
      toast.success('Enviado para aprovação!');
      setApprovingStatus(false);
    } catch (error) {
      toast.error('Erro ao alterar status!');
    }
  });

  const handleApprovedStatus = hookFormSubmit(async () => {
    try {
      setApprovedStatus(true);
      await mutateAsync({
        id: id!,
        status: "approved"
      });
      queryClient.invalidateQueries({ queryKey: ['viewjob', 'jobs-all'] });
      toast.success('Solicitação aprovada!');
      setApprovedStatus(false);
    } catch (error) {
      toast.error('Erro ao alterar status!');
    }
  });

  return {
    jobData: jobData?.data,
    isLoading,
    isChangeStatus,
    user,
    handleChangingStatus,
    handleApprovingStatus,
    handleApprovedStatus,
    changingStatus,
    approvingStatus,
    approvedStatus
  }
}
