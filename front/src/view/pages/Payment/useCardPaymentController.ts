import { plansService } from "@/app/services/plansService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string()
    .min(1, 'O nome é de preenchimento obrigatório.'),
  card: z.string()
    .min(1, 'Campo de preenchimento obrigatório.'),
  mes: z.string()
    .min(1, 'Mês é obrigatório.'),
  ano: z.string()
    .min(1, 'Ano é obrigatório.'),
  cvc: z.string()
    .min(1, 'CVC é obrigatório.'),
});

type FormData = z.infer<typeof schema>

export function useCardPaymentController() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('plan')

  const { data, isLoading } = useQuery({
    queryKey: ['editPlanPayment', id],
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
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const handleSubmit = hookFormSubmit((data) => {
    try {
      console.log(data);

    } catch (error) {
      toast.error('Erro ao obter os dados!');
    }
  });

  return {
    plan: data?.data,
    isLoading,
    handleSubmit,
    control,
    register,
    errors
  }
}
