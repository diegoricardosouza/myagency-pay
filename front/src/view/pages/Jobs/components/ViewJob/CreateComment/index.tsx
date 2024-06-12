import { Dropzone } from "@/view/components/Dropzone";
import { Modal } from "@/view/components/Modal";
import { Button } from "@/view/components/ui/button";
import { Card, CardContent } from "@/view/components/ui/card";
import { Label } from "@/view/components/ui/label";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/pt-br';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Loader2 } from "lucide-react";
import { Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { useCreateCommentController } from "./useCreateCommentController";

interface CreateCommentProps {
  whatsapp?: string
}

export function CreateComment({ whatsapp }: CreateCommentProps) {
  const {
    handleSubmit,
    control,
    errors,
    isLoadingCreateComment,
    id,
    openModalComment,
    closeCommentModal
  } = useCreateCommentController()

  const numberFormated = whatsapp?.replace(/\D/g, '');

  return (
    <>
      <form
        className="grid auto-rows-max items-start gap-4 lg:gap-5"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <Card x-chunk="dashboard-07-chunk-3" className="pt-6">
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label>Comentário:</Label>
                {/* <Textarea {...register('content')} className="h-[150px]" /> */}
                <div className="w-full max-w-[258px] sm:max-w-full lg:max-w-[313px]">
                  <Controller
                    control={control}
                    name="content"
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                      <CKEditor
                        editor={ClassicEditor}
                        data={value}
                        config={{
                          language: 'pt-br'
                        }}
                        onChange={(_event, editor) => {
                          const data = editor.getData();
                          onChange(data);
                        }}
                      />
                    )}
                  />
                </div>

                {errors?.content?.message && (
                  <div className="flex gap-2 items-center text-red-700">
                    <span className="text-xs">{errors?.content?.message}</span>
                  </div>
                )}
              </div>

              <div className="grid gap-3">
                <Controller
                  control={control}
                  name="files"
                  defaultValue={null}
                  render={({ field: { onChange } }) => (
                    <Dropzone onChange={onChange} className="min-h-[200px]" clearFiles={isLoadingCreateComment} columnsFiles={2} />
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-center gap-2 md:ml-auto md:flex">
          <Button type="submit" size="sm" disabled={isLoadingCreateComment}>
            {isLoadingCreateComment && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Enviar comentário
          </Button>
        </div>
      </form>

      <Modal open={openModalComment} onClose={closeCommentModal}>
        <p className="text-center">
          Clique no botão para compartilhar a arte no whatsapp do cliente
        </p>

        <Button asChild className="max-w-[250px] m-auto">
          <Link to={`https://api.whatsapp.com/send/?phone=${numberFormated}&text=Olá%20tudo%20bem?%0DSua%20espera%20acabou!%0DAcesse%20o%20link%20abaixo%20para%20conferir!%0Dhttps://minhaagencia.inovasite.com/solicitacoes/detalhes/${id}`} target="_blank">
            Compartilhar
          </Link>
        </Button>
      </Modal>
    </>
  )
}
