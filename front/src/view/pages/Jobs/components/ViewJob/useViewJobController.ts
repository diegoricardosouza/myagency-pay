import { useAuth } from "@/app/hooks/useAuth";
import { jobsService } from "@/app/services/jobs";
import { UpdateJobParams } from "@/app/services/jobs/update";
import { extractYouTubeId } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";


export function useViewJobController() {
  const [changingStatus, setChangingStatus] = useState(false);
  const [approvingStatus, setApprovingStatus] = useState(false);
  const [approvedStatus, setApprovedStatus] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    handleSubmit: hookFormSubmit
  } = useForm();

  const { data: jobData, isLoading } = useQuery({
    queryKey: ['viewjob', id],
    staleTime: 0,
    queryFn: async () => {
      try {
        const response = await jobsService.getById(id!);
        return response;
      } catch (error) {
        toast.error('Solicitação não encontrada');
        navigate("/solicitacoes");
      }
    }
  });

  const {
    isPending: isChangeStatus,
    mutateAsync
  } = useMutation({
    mutationFn: async (data: UpdateJobParams) => {
      return jobsService.update(data);
    }
  });

  // console.log("user:", user!.data.id);

  const processedContent = useMemo(() => {
      if (!jobData?.data.content) return '';

      // Criar um elemento temporário para processar o HTML
      const temp = document.createElement('div');
      temp.innerHTML = jobData?.data.content;

      // Encontrar todas as tags oembed
      const oembeds = temp.querySelectorAll('oembed');

      oembeds.forEach(oembed => {
        const url = oembed.getAttribute('url');

        if (url) {
          // Extrair ID do vídeo do YouTube
          const youtubeId = extractYouTubeId(url);

          if (youtubeId) {
            // Criar iframe do YouTube
            const iframe = document.createElement('iframe');
            iframe.setAttribute('width', '100%');
            iframe.setAttribute('height', '315');
            iframe.setAttribute('src', `https://www.youtube.com/embed/${youtubeId}`);
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
            iframe.setAttribute('allowfullscreen', 'true');
            iframe.style.maxWidth = '560px';
            iframe.style.borderRadius = '8px';

            // Substituir oembed pelo iframe
            const figure = oembed.closest('figure');
            if (figure) {
              figure.replaceWith(iframe);
            } else {
              oembed.replaceWith(iframe);
            }
          }
        }
      });

      return temp.innerHTML;
    }, [jobData?.data.content]);

  const processedContentObs = useMemo(() => {
      if (!jobData?.data.obs) return '';

      // Criar um elemento temporário para processar o HTML
      const temp = document.createElement('div');
      temp.innerHTML = jobData?.data.obs;

      // Encontrar todas as tags oembed
      const oembeds = temp.querySelectorAll('oembed');

      oembeds.forEach(oembed => {
        const url = oembed.getAttribute('url');

        if (url) {
          // Extrair ID do vídeo do YouTube
          const youtubeId = extractYouTubeId(url);

          if (youtubeId) {
            // Criar iframe do YouTube
            const iframe = document.createElement('iframe');
            iframe.setAttribute('width', '100%');
            iframe.setAttribute('height', '315');
            iframe.setAttribute('src', `https://www.youtube.com/embed/${youtubeId}`);
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
            iframe.setAttribute('allowfullscreen', 'true');
            iframe.style.maxWidth = '560px';
            iframe.style.borderRadius = '8px';

            // Substituir oembed pelo iframe
            const figure = oembed.closest('figure');
            if (figure) {
              figure.replaceWith(iframe);
            } else {
              oembed.replaceWith(iframe);
            }
          }
        }
      });

      return temp.innerHTML;
    }, [jobData?.data.obs]);

  const handleChangingStatus = hookFormSubmit(async () => {
    try {
      setChangingStatus(true);
      await mutateAsync({
        id: id!,
        status: "changing"
      });
      queryClient.invalidateQueries({ queryKey: ['viewjob'] });
      toast.success('Enviado para alteração!');
      setChangingStatus(false);
    } catch (error) {
      toast.error('Erro ao alterar status!');
    }
  });

  const handleApprovingStatus = hookFormSubmit(async () => {
    try {
      setApprovingStatus(true);
      await mutateAsync({
        id: id!,
        status: "approving"
      });
      queryClient.invalidateQueries({ queryKey: ['viewjob'] });
      toast.success('Enviado para aprovação!');
      setApprovingStatus(false);
    } catch (error) {
      toast.error('Erro ao alterar status!');
    }
  });

  const handleApprovedStatus = hookFormSubmit(async () => {
    try {
      setApprovedStatus(true);
      await mutateAsync({
        id: id!,
        status: "approved"
      });
      queryClient.invalidateQueries({ queryKey: ['viewjob'] });
      toast.success('Solicitação aprovada!');
      setApprovedStatus(false);
    } catch (error) {
      toast.error('Erro ao alterar status!');
    }
  });

  return {
    jobData: jobData?.data,
    isLoading,
    isChangeStatus,
    user,
    handleChangingStatus,
    handleApprovingStatus,
    handleApprovedStatus,
    changingStatus,
    approvingStatus,
    approvedStatus,
    whatsapp: jobData?.data.user.whatsapp,
    processedContent,
    processedContentObs
  }
}
