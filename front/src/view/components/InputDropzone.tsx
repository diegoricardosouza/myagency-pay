import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";
import { DropzoneState } from "react-dropzone";

interface InputDropzoneProps {
  dropzone: DropzoneState;
}

export const InputDropzone = ({ dropzone }: InputDropzoneProps) => {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = dropzone;

  // const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
  const fileRejectionItems = fileRejections.map(({ file, errors }) => {
    return (
      <div key={file.name}>
        {file.name} - {file.size} bytes
        <div>
          {errors.map(e => <li key={e.code}>{e.message}</li>)}
        </div>
      </div>
    )
  });

  return (
    <>
      <div
        {...getRootProps()}
        className={cn(
          "w-full h-full max-w-[500px] min-h-[300px] rounded-lg border-dashed border-2  hover:border-gray-500 hover:bg-gray-100 transition-all",
          isDragActive && "border-blue-500"
        )}
      >
        <input {...getInputProps()} className="hidden" />
        <label htmlFor="dropzone-file" className="cursor-pointer w-full h-full">
          <div className="flex flex-col items-center justify-center pt-5 pb-6 w-full h-full">
            <Upload className={`h-10 w-10 mx-auto mb-3 ${isDragActive ? 'text-blue-500' : 'text-gray-400'}`} />
            {isDragActive ? (
              <p className="font-bold text-lg text-blue-500">Solte para adicionar</p>
            ) : (
              <>
                <p className="mb-2 text-lg text-gray-400 text-center">
                  <span className="font-bold">Clique para enviar</span> ou arraste até aqui
                </p>
              </>
            )}
          </div>
        </label>
      </div>

      <p className="text-xs text-gray-500 mt-2">
        Arquivos permitidos (max: 3mb):<br />
        JPG, JPEG, PNG, GIF, SVG, PDF, DOC, DOCX, TXT, CSV, XLS, XLSX, ZIP, RAR
      </p>

      {isDragReject && (
        <p className="text-sm">"Arquivo Muito grande (maximo de 3Mb)!"</p>
      )}

      {fileRejectionItems && (
        <div className="w-full text-sm max-w-[500px] break-all">{fileRejectionItems}</div>
      )}
    </>
  )
}
