import { cn } from "@/lib/utils";
import { Download, FileCheck2 } from "lucide-react";
import { Link } from "react-router-dom";

interface FileViewJobProps {
  id: string;
  name: string;
  url: string;
}

export function FileViewJob({ id, url, name }: FileViewJobProps) {
  const nameTrated = name.replace("jobs/", "")

  return (
    <div
      key={id}
      className={cn(
        "w-full h-full rounded-lg transition-all flex items-center"
      )}
    >
      <div className="bg-muted w-full rounded-md shadow-md flex gap-3 items-center justify-between">
        <div className="flex flex-1 gap-2 items-center">
          <div className="w-4 h-4 my-3 ml-4">
            <FileCheck2 className="w-4 h-4" />
          </div>

          <span className="text-xs text-gray-500 ml-0 break-all my-3">
            {nameTrated}
          </span>
        </div>

        <Link to={url} download target="_blank">
          <Download className="w-4 h-4 mr-4" />
        </Link>
      </div>
    </div>
  )
}
