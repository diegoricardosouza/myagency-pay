import { usePagination } from "@/app/hooks/usePagination";
import { usersService } from "@/app/services/usersService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUserController(perPage = 6) {
  const pagination = usePagination(perPage);

  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery({
    queryKey: ['users', { page: pagination.currentPage, perPage}],
    staleTime: 0,
    queryFn: async () => {
      const response = await usersService.getAll(pagination.currentPage, perPage);

      pagination.setTotalItems(response.meta.total);

      return response;
    },
  });

  const {
    isPending: isLoadingDelete,
    mutateAsync: removeUser
  } = useMutation({
    mutationFn: async (id: string) => {
      return usersService.remove(id);
    }
  });

  async function handleDeleteUser(id: string) {
    try {
      // console.log(id);
      await removeUser(id);

      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('A usuário foi deletado com sucesso!');
    } catch {
      toast.error('Erro ao deletar o usuário!');
    }
  }

  return {
    users: data?.data,
    isFetching,
    handleDeleteUser,
    isLoadingDelete,
    pagination
  };
}
