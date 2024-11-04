import { ordersService } from "@/app/services/ordersService";
import { useQuery } from "@tanstack/react-query";

export function useOrderController() {
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['orders'],
    staleTime: 0,
    queryFn: async () => {
      const response = await ordersService.getAll();

      return response;
    },
  });

  return {
    orders: data?.data,
    isFetching,
    isLoading
  };
}
