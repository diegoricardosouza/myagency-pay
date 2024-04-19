import { Files } from "@/app/entities/Jobs";
import { cn } from "@/lib/utils";
import { FileViewJob } from "@/view/components/FileViewJob";
import { Card, CardContent } from "@/view/components/ui/card";
import { Label } from "@/view/components/ui/label";
import { CircleUser } from "lucide-react";

interface CommentsProps {
  id: string;
  company: string;
  content: string;
  files?: Files[];
  userId: string;
}

export function Comments({ id, company, content, files, userId }: CommentsProps) {
  return (
    <div className="mt-4">
      <h3 className={cn(
        "font-semibold flex items-center gap-1 mb-2",
        id !== userId && "justify-end"
      )}>
        <CircleUser className="w-5 h-5" />
        {company}
      </h3>
      <Card x-chunk="dashboard-07-chunk-3" className={cn(
          "pt-6",
          id !== userId && "bg-gray-100/70"
        )
      }>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label>Comentário:</Label>
              <p>{content}</p>
            </div>

            <div className="grid gap-3">
              <Label>Arquivos:</Label>
              <div className="grid lg:grid-cols-2 gap-2">
                {files?.map((file) => {
                  const nameConvert = file.name.replace("comments/", "jobs/")
                  return <FileViewJob key={file.id} id={file.id} url={file.url} name={nameConvert} />
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
