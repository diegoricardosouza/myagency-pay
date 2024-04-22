import { Dropzone } from "@/view/components/Dropzone";
import { Button } from "@/view/components/ui/button";
import { Card, CardContent } from "@/view/components/ui/card";
import { Label } from "@/view/components/ui/label";
import { Textarea } from "@/view/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { Controller } from "react-hook-form";
import { useCreateCommentController } from "./useCreateCommentController";

export function CreateComment() {
  const {
    handleSubmit,
    register,
    control,
    errors,
    isLoadingCreateComment
  } = useCreateCommentController()

  return (
    <form
      className="grid auto-rows-max items-start gap-4 lg:gap-5 mt-6"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <Card x-chunk="dashboard-07-chunk-3" className="pt-6">
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label>Comentário:</Label>
              <Textarea {...register('content')} className="h-[150px]" />
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
                  <Dropzone onChange={onChange} className="min-h-[200px]" clearFiles={isLoadingCreateComment} />
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
  )
}
