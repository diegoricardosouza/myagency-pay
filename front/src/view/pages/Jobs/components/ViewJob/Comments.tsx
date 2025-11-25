import { Files } from "@/app/entities/Jobs";
import { cn } from "@/lib/utils";
import { FileViewJob } from "@/view/components/FileViewJob";
import { Avatar, AvatarImage } from "@/view/components/ui/avatar";
import { Card, CardContent } from "@/view/components/ui/card";
import { Label } from "@/view/components/ui/label";
import { format } from "date-fns";
import { useMemo } from "react";

interface CommentsProps {
  id: string;
  company: string;
  content: string;
  files?: Files[];
  userId: string;
  logo: string;
  date: string;
}

// Função para extrair ID do YouTube de várias URLs
const extractYouTubeId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/,
    /youtube\.com\/watch\?.*v=([^&]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
};

export function Comments({ id, company, content, files, userId, logo, date }: CommentsProps) {
  // Processar conteúdo HTML para converter oembed em iframe
  const processedContent = useMemo(() => {
    if (!content) return '';

    // Criar um elemento temporário para processar o HTML
    const temp = document.createElement('div');
    temp.innerHTML = content;

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
  }, [content]);

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className={cn(
          "font-semibold flex items-center gap-2 text-sm lg:text-base justify-end",
          id !== userId && "justify-start"
        )}>
          {/* <CircleUser className="w-5 h-5" /> */}
          <Avatar className="h-9 w-9 sm:flex border">
            <AvatarImage src={logo} alt={company} className="object-contain" />
          </Avatar>
          {company}
        </h3>

        <div>
          <span className="text-xs font-normal text-gray-500">
            {format(date, "dd/MM/yyyy")} às {format(date, "HH:mm")}hrs
          </span>
        </div>
      </div>

      <Card x-chunk="dashboard-07-chunk-3" className={cn(
        "pt-6 bg-primary text-white",
        id !== userId && "bg-muted text-gray-500"
      )
      }>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label>Comentário:</Label>
              {/* <p className="break-all">{content}</p> */}

              <div
                className="text-sm break-all comments-content"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />
            </div>

            {files?.length ? (
              <div className="grid gap-3">
                <Label>Arquivos:</Label>
                <div className="grid lg:grid-cols-3 gap-2">
                  {files?.map((file) => {
                    const nameConvert = file.name.replace("comments/", "jobs/")
                    return <FileViewJob key={file.id} id={file.id} url={file.url} name={nameConvert} />
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
