import { plansService } from "@/app/services/plansService";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export function usePaymentController() {
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

  return {
    plan: data?.data,
    isLoading
  }
}
