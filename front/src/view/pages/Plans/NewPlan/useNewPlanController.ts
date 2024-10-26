import { plansService } from "@/app/services/plansService";
import { PlanParams } from "@/app/services/plansService/create";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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

export function useNewPlanController() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit: hookFormSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      updates: "0",
      digital_midia: "0",
      printed: "0",
      presentations: "0"
    }
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: PlanParams) => {
      return plansService.create(data);
    }
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        updates: Number(data.updates),
        digital_midia: Number(data.digital_midia),
        printed: Number(data.printed),
        presentations: Number(data.presentations),
      });

      queryClient.invalidateQueries({ queryKey: ['plans'] });
      toast.success('Plano cadastrado com sucesso!');
      reset();
      navigate("/planos");
    } catch (error) {
      toast.error('Erro ao cadastrar o plano');
    }
  });

  return {
    errors,
    register,
    handleSubmit,
    isPending
  }
}
