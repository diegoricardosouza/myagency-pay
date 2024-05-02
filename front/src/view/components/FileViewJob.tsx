import { cn, isImageUrl } from "@/lib/utils";
import { Download, FileCheck2 } from "lucide-react";
import { Link } from "react-router-dom";

interface FileViewJobProps {
  id: string;
  name: string;
  url: string;
}

export function FileViewJob({ id, url, name }: FileViewJobProps) {
  const nameTrated = name.replace("jobs/", "")

  console.log(isImageUrl(url));


  return (
    <div
      key={id}
      className={cn(
        "w-full h-full rounded-lg transition-all flex items-center"
      )}
    >
      <div className="bg-muted w-full rounded-md shadow-md p-2 h-full">
        <div className="flex items-center justify-center h-[92px]">
          {isImageUrl(url) ? (
            <img src={url} alt="" className="w-full h-[92px] object-cover" />
          ) : <FileCheck2 className="w-12 h-12 m-auto text-primary" />}
        </div>

        <div className="flex items-center justify-between mt-1 gap-2">
          <span className="text-xs text-gray-500 ml-0 flex-1 break-all">{nameTrated}</span>

          <Link to={url} download target="_blank">
            <Download className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
