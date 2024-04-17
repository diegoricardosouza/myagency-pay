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
      <div className="bg-muted w-full rounded-md shadow-md flex gap-3 items-center justify-between">
        <div className="flex flex-1 gap-2 items-center">
          <div className="w-4 h-4 my-3 ml-4">
            <FileCheck2 className="w-4 h-4" />
          </div>

          <span className="text-xs text-gray-500 ml-0">{file?.name}</span>
        </div>

        <button type="button" onClick={removeFile}>
          <X className="w-4 h-4 mr-4" />
        </button>
      </div>
    </div>
  )
}
