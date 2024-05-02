import { X } from "lucide-react";

interface F extends File {
  preview: string;
}

interface HasImageProps {
  file?: F;
  removeFile: () => void;
}

export function HasImage({ file, removeFile }: HasImageProps) {
  return (
    <div
      className="bg-muted w-full rounded-md shadow-md p-2 h-full"
    >
      <img src={file?.preview} alt="" className="w-full h-[92px] object-cover" />

      <div className="flex items-center justify-between mt-1">
        <span className="text-xs text-gray-500 ml-0 flex-1 break-all">{file?.name}</span>

        <button type="button" onClick={removeFile}>
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
