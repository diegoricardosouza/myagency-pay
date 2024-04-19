import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { HasFile } from "./HasFile";
import { InputDropzone } from "./InputDropzone";

interface FileWithPreview extends File {
  preview: string;
}

interface DropzoneProps {
  onChange: (files: File[]) => void;
  className?: string;
}

export function Dropzone({ onChange, className }: DropzoneProps) {
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
    maxSize: 3242880,
  });

  // const a = [];
  // if (dropzone.fileRejections.length > 0) {
  //   console.log('erro file', dropzone.fileRejections);
  //   setFile([]);
  // }


  // if (dropzone.fileRejections.length > 0) {
  //   console.log('erro file', dropzone.fileRejections);
  //   // setFile([]);
  // }

  // console.log(a);


  return (
    <>
      <InputDropzone dropzone={dropzone} className={className} />

      <div>
        {file?.length > 0 && (
          <p className="font-bold mb-2 mt-2">Arquivos Selecionados</p>
        )}

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {file?.map((file: File, index) => (
            <HasFile key={file.name} file={file} removeFile={() => removeFile(index)} />
          ))}
        </div>
      </div>
    </>
  )
}




