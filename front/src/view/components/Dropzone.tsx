import { ACCEPTED_IMAGE_MIME_TYPES } from "@/app/config/constants";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { HasFile } from "./HasFile";
import { HasImage } from "./HasImage";
import { InputDropzone } from "./InputDropzone";

interface FileWithPreview extends File {
  preview: string;
}

interface DropzoneProps {
  onChange: (files: File[]) => void;
  className?: string;
  clearFiles?: boolean;
  columnsFiles?: 1 | 2 | 3
}



export function Dropzone({ onChange, className, clearFiles, columnsFiles = 3 }: DropzoneProps) {
  const [file, setFile] = useState<FileWithPreview[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      const newFiles = [
        ...file,
        ...acceptedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      ];
      setFile(newFiles);
      onChange(newFiles);
    }

    onChange(acceptedFiles);
  }, [onChange, file]);

  const removeFile = useCallback((index: number) => {
    const newFiles = [...file];
    newFiles.splice(index, 1);
    setFile(newFiles);
    onChange(newFiles);
  }, [onChange, file]);

  const dropzone = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
      'application/msword': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
      'application/pdf': [],
      'application/vnd.ms-powerpoint': [],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': [],
      'application/vnd.rar': [],
      'text/plain': [],
      'image/webp': [],
      'application/vnd.ms-excel': [],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
      'application/zip': [],
      'text/csv': [],
    },
    maxSize: 20971520,
  });

  useEffect(() => {
    if (clearFiles) {
      setFile([]);
    }
    if (dropzone.fileRejections.length > 0) {
      setFile([]);
    }
  }, [clearFiles, dropzone.fileRejections]);

  return (
    <>
      <InputDropzone dropzone={dropzone} className={className} />

      <div>
        {file?.length > 0 && (
          <p className="font-bold mb-2 mt-2">Arquivos Selecionados</p>
        )}

        <div className={
          cn(
            'grid grid-cols-2 gap-3',
            columnsFiles === 1 && "md:grid-cols-1",
            columnsFiles === 2 && "md:grid-cols-2",
            columnsFiles === 3 && "md:grid-cols-3",
          )
        }>
          {file?.map((file: FileWithPreview, index) => {
            if (ACCEPTED_IMAGE_MIME_TYPES.indexOf(file?.type) === -1) {
              return <HasFile key={index} file={file} removeFile={() => removeFile(index)} />
            }

            return <HasImage key={index} file={file} removeFile={() => removeFile(index)} />
          })}
        </div>
      </div>
    </>
  )
}




