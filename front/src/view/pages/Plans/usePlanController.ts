import { plansService } from "@/app/services/plansService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function usePlanController() {
  const queryClient = useQueryClient();

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['plans'],
    staleTime: 0,
    queryFn: async () => {
      const response = await plansService.getAll();

      return response;
    },
  });

  const {
    isPending: isLoadingDelete,
    mutateAsync: removePlan
  } = useMutation({
    mutationFn: async (id: string) => {
      return plansService.remove(id);
    }
  });

  async function handleDeletePlan(id: string) {
    try {
      await removePlan(id);

      queryClient.invalidateQueries({ queryKey: ['plans'] });
      toast.success('O plano foi deletado com sucesso!');
    } catch {
      toast.error('Erro ao deletar o plano!');
    }
  }

  return {
    plans: data?.data,
    isFetching,
    handleDeletePlan,
    isLoadingDelete,
    isLoading
  };
}
