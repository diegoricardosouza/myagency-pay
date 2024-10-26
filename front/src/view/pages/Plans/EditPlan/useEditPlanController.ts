import { plansService } from "@/app/services/plansService";
import { UpdatePlanParams } from "@/app/services/plansService/update";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string()
    .min(1, 'Nome é obrigatório'),
  updates: z.string()
    .min(1, 'Atualizações é obrigatório'),
  digital_midia: z.string()
    .min(1, 'Mídia Digital é obrigatório'),
  printed: z.string()
    .min(1, 'Impresso é obrigatório'),
  presentations: z.string()
    .min(1, 'Apresentações é obrigatório'),
});

type FormData = z.infer<typeof schema>

export function useEditPlanController() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const { data: planEditData, isLoading } = useQuery({
    queryKey: ['editPlan', id],
    staleTime: 0,
    queryFn: async () => {
      try {
        const response = await plansService.getById(id!);
        return response;
      } catch (error) {
        toast.error('Plano não encontrado');
        navigate("/planos");
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
    if (planEditData?.data) {
      setValue("name", planEditData?.data?.name);
      setValue("updates", String(planEditData?.data?.updates));
      setValue("digital_midia", String(planEditData?.data?.digital_midia));
      setValue("printed", String(planEditData?.data?.printed));
      setValue("presentations", String(planEditData?.data?.presentations));
    }
  }, [planEditData, setValue]);

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: UpdatePlanParams) => {
      return plansService.update(data);
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

      queryClient.invalidateQueries({ queryKey: ['editPlan'] });
      toast.success('Plano atualizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar o plano');
    }
  });

  return {
    errors,
    register,
    handleSubmit,
    control,
    isPending,
    isLoading,
  }
}
