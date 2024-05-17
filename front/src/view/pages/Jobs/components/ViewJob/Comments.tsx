import { Files } from "@/app/entities/Jobs";
import { cn } from "@/lib/utils";
import { FileViewJob } from "@/view/components/FileViewJob";
import { Avatar, AvatarImage } from "@/view/components/ui/avatar";
import { Card, CardContent } from "@/view/components/ui/card";
import { Label } from "@/view/components/ui/label";

interface CommentsProps {
  id: string;
  company: string;
  content: string;
  files?: Files[];
  userId: string;
  logo: string;
}

export function Comments({ id, company, content, files, userId, logo }: CommentsProps) {
  return (
    <div className="mt-4">
      <h3 className={cn(
        "font-semibold flex items-center gap-2 mb-2 text-sm lg:text-base justify-end",
        id !== userId && "justify-start"
      )}>
        {/* <CircleUser className="w-5 h-5" /> */}
        <Avatar className="h-9 w-9 sm:flex border">
          <AvatarImage src={logo} alt={company} className="object-contain" />
        </Avatar>
        {company}
      </h3>
      <Card x-chunk="dashboard-07-chunk-3" className={cn(
          "pt-6 bg-primary text-white",
        id !== userId && "bg-muted text-gray-500"
        )
      }>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label>Comentário:</Label>
              <p className="break-all">{content}</p>
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
