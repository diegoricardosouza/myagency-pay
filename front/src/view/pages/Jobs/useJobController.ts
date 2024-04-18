import { useAuth } from "@/app/hooks/useAuth";
import { usePagination } from "@/app/hooks/usePagination";
import { jobsService } from "@/app/services/jobs";
import { formatedDate } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  startDate: z.date({
    required_error: "Data de preenchimento obrigatório.",
  }),
  endDate: z.date({
    required_error: "Data de preenchimento obrigatório.",
  })
});

type FormData = z.infer<typeof schema>

export function useJobController(perPage = 6) {
  const [startDate, setStartDate] = useState<string | null | undefined>();
  const [endDate, setEndDate] = useState<string | null | undefined>();
  const { user } = useAuth();
  const [, setSearchParams] = useSearchParams();
  const pagination = usePagination(perPage);
  const queryClient = useQueryClient();

  // Obtém a data atual
  const dateNow = new Date();
  const dateStartCut = (dateNow.getMonth() + 1) + '-' + user?.data.day + '-' + dateNow.getFullYear();
  const dateEndCut = (dateNow.getMonth() + 2) + '-' + user?.data.day + '-' + dateNow.getFullYear();

  const {
    register,
    handleSubmit: hookFormSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['jobs', { page: pagination.currentPage, perPage }, startDate, endDate],
    staleTime: 0,
    queryFn: async () => {
      const response = await jobsService.getAll(pagination.currentPage, perPage, startDate, endDate);

      pagination.setTotalItems(response.meta.total);

      return response;
    },
  });


  // const { data: cliente } = useQuery({
  //   queryKey: ['users'],
  //   staleTime: 0,
  //   queryFn: async () => {
  //     return usersService.getById(id);
  //   },
  // });

  const {
    isPending: isLoadingDelete,
    mutateAsync: removeJob
  } = useMutation({
    mutationFn: async (id: string) => {
      return jobsService.remove(id);
    }
  });

  async function handleDeleteJob(id: string) {
    try {
      await removeJob(id);

      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast.success('A solicitação foi deletada com sucesso!');
    } catch {
      toast.error('Erro ao deletar a solicitação!');
    }
  }

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const starDate = formatedDate(data.startDate.toISOString());
      const endDate = formatedDate(data.endDate.toISOString());

      setStartDate(starDate);
      setEndDate(endDate);

      setSearchParams(params => {
        params.set('startDate', String(starDate))
        params.set('endDate', String(endDate))

        return params;
      });
    } catch (error) {
      toast.error('Erro ao obter os dados!');
    }
  });

  return {
    register,
    control,
    reset,
    errors,
    handleSubmit,
    dateStartCut,
    dateEndCut,
    isLoading,
    jobs: data?.data ?? [],
    isFetching,
    handleDeleteJob,
    isLoadingDelete,
    user,
    pagination
  };
}
