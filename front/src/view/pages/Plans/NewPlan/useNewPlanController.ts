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
  quantity: z.string()
    .min(1, 'Quantidade é obrigatório'),
  price: z.string()
    .min(1, 'Preço é obrigatório')
});

type FormData = z.infer<typeof schema>

export function useNewPlanController() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit: hookFormSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      quantity: "1"
    }
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: PlanParams) => {
      return plansService.create(data);
    }
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const price = data.price;
      const priceFormated = `${price.slice(0, -2)}.${price.slice(-2)}`;

      await mutateAsync({
        ...data,
        quantity: data.quantity,
        price: priceFormated
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
    isPending,
    control
  }
}
