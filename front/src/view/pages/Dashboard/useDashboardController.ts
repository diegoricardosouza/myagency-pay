import { useAuth } from "@/app/hooks/useAuth";
import { jobsService } from "@/app/services/jobs";
import { formatedDate } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
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

export function useDashboardController() {
  const { user } = useAuth();
  const [openModalDashboard, setOpenModalDashboard] = useState(false);

  // Obtém a data atual
  const dateNow = new Date();
  // const dayNow = dateNow.getDate();
  // let dateStartCut = null;
  // let dateEndCut = null;

  // if (dayNow < user!.data.day) {
  //   dateStartCut = (dateNow.getMonth()) + '-' + user?.data.day + '-' + dateNow.getFullYear();
  //   dateEndCut = (dateNow.getMonth() + 1) + '-' + user?.data.day + '-' + dateNow.getFullYear();
  // } else {
  //   dateStartCut = (dateNow.getMonth() + 1) + '-' + user?.data.day + '-' + dateNow.getFullYear();
  //   dateEndCut = (dateNow.getMonth() + 2) + '-' + user?.data.day + '-' + dateNow.getFullYear();
  // }

  const dateStartCut = (dateNow.getMonth()) + '-' + dateNow.getDate() + '-' + dateNow.getFullYear();
  const dateEndCut = (dateNow.getMonth() + 1) + '-' + dateNow.getDate() + '-' + dateNow.getFullYear();

  const initStarDate = format(dateStartCut, "yyyy-MM-dd");
  const initEndDate = format(dateEndCut, "yyyy-MM-dd");

  const [startDate, setStartDate] = useState<string | undefined>(initStarDate);
  const [endDate, setEndDate] = useState<string | undefined>(initEndDate);
  const [, setSearchParams] = useSearchParams();

  const {
    register,
    handleSubmit: hookFormSubmit,
    control,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['jobs-all', startDate, endDate],
    queryFn: async () => {
      const response = await jobsService.getAllNoPagination(startDate, endDate);

      return response;
    }
  })

  const jobsPending = data?.data.filter(job => job.status === 'pending');
  const jobsApproving = data?.data.filter(job => job.status === 'approving');
  const jobsChanging = data?.data.filter(job => job.status === 'changing');
  const jobsApproved = data?.data.filter(job => job.status === 'approved');

  function openDashboardModal() {
    setOpenModalDashboard(true);
  }

  function closeDashboardModal() {
    setOpenModalDashboard(false);
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
      setOpenModalDashboard(false);
    } catch (error) {
      toast.error('Erro ao obter os dados!');
    }
  });

  return {
    user,
    isFetching,
    jobsPending,
    jobsApproving,
    jobsChanging,
    jobsApproved,
    register,
    control,
    errors,
    handleSubmit,
    isLoading,
    dateStartCut,
    dateEndCut,
    openDashboardModal,
    closeDashboardModal,
    openModalDashboard
  }
}
