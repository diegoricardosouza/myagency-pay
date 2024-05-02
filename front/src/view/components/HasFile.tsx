import { cn } from "@/lib/utils";
import { FileCheck2, X } from "lucide-react";

interface HasFileProps {
  file?: File;
  removeFile: () => void;
}

export const HasFile = ({ file, removeFile }: HasFileProps) => {
  return (
    <div
      className={cn(
        "w-full h-full rounded-lg transition-all flex items-center"
      )}
    >
      <div className="bg-muted w-full rounded-md shadow-md p-2 h-full">
        <div className="flex items-center justify-center h-[92px]">
          <FileCheck2 className="w-12 h-12 m-auto text-primary" />
        </div>

        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-gray-500 ml-0 flex-1 break-all">{file?.name}</span>

          <button type="button" onClick={removeFile}>
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
