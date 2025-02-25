import { ordersService } from "@/app/services/ordersService";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export function useSuccessOrderController() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['showOrder', id],
    staleTime: 0,
    queryFn: async () => {
      try {
        const response = await ordersService.getByTransactionId(id!);
        return response;
      } catch (error) {
        toast.error('Pedido não encontrado');
        navigate("/pedidos");
      }
    }
  });

  function handleRefresh() {
    console.log('chegou refresh');
    navigate("/pedidos", { replace: true });
    window.location.reload();
  }

  return {
    data,
    isLoading,
    handleRefresh
  }
}
