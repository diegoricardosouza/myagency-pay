import { Button } from "@/view/components/ui/button";
import { Card, CardContent } from "@/view/components/ui/card";
import { Input } from "@/view/components/ui/input";
import { Label } from "@/view/components/ui/label";

import { FORMATS_DIGITAL_MIDIA, FORMATS_PRESENTATION, FORMATS_PRINTED, LevelProps } from "@/app/config/constants";
import { Dropzone } from "@/view/components/Dropzone";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/view/components/ui/select";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/pt-br';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ChevronLeft, Loader2 } from "lucide-react";
import { Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { BreadcrumbNewFormats } from "./BreadcrumbNewFormats";
import { CountJob } from "./CountJob";
import { useNewFormatsController } from "./useNewFormatsController";

export function NewFormats() {
  const {
    errors,
    handleSubmit,
    control,
    register,
    formats,
    isPending,
    exceeded,
    nJobsAvailable,
    user,
    isLoadingJobsCount
  } = useNewFormatsController();

  return (
    <>
      <BreadcrumbNewFormats />

      <div className="grid flex-1 items-start gap-4 p-4 sm:px-0 sm:py-0 md:gap-8">
        <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4">
          <CountJob
            exceeded={exceeded}
            isLoading={isLoadingJobsCount}
            level={user?.data.level}
            JobsAvailable={nJobsAvailable}
          />

          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-7 w-7" asChild>
              <Link to="/solicitacoes/novo">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Adicionar Nova Solicitação
            </h1>
          </div>

          <form
            className="flex flex-col gap-4 lg:gap-5 lg:flex-row w-full"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="w-[300px] md:w-[100%] lg:w-[50%] lg:max-w-[100%] items-start gap-4 lg:gap-5">
              <Card x-chunk="dashboard-07-chunk-0" className="pt-6">
                <CardContent>
                  <div className="flex flex-col gap-6">
                    {formats === 'atualizacoes' && (
                      <>
                        <div className="gap-3">
                          <Label htmlFor="name">Site</Label>
                          <Input
                            id="name"
                            type="text"
                            className="w-full"
                            {...register('site')}
                            error={errors?.site?.message}
                          />
                        </div>

                        <div className="gap-3">
                          <Label htmlFor="page">Página que deseja atualizar</Label>
                          <Input
                            id="page"
                            type="text"
                            className="w-full"
                            {...register('page')}
                            error={errors?.page?.message}
                          />
                        </div>
                      </>
                    )}

                    {formats !== 'atualizacoes' && (
                      <>
                        <div className="gap-3">
                          <Label htmlFor="format">Formato</Label>
                          <Controller
                            control={control}
                            name="format"
                            defaultValue={formats === 'midia-digital' ? 'Feed' : (formats === 'apresentacoes' ? 'Impresso' : 'A3 (29,7x42cm)')}
                            render={({ field: { onChange, value } }) => (
                              <Select
                                onValueChange={onChange}
                                value={value === null ? undefined : value}
                              >
                                <SelectTrigger
                                  aria-label="Selecione o formato"
                                  id="format"
                                >
                                  <SelectValue placeholder="Selecione o formato" />
                                </SelectTrigger>
                                <SelectContent>
                                  {formats === 'midia-digital' && (
                                    FORMATS_DIGITAL_MIDIA.map((level: LevelProps) => (
                                      <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                                    ))
                                  )}
                                  {formats === 'impresso' && (
                                    FORMATS_PRINTED.map((level: LevelProps) => (
                                      <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                                    ))
                                  )}
                                  {formats === 'apresentacoes' && (
                                    FORMATS_PRESENTATION.map((level: LevelProps) => (
                                      <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                                    ))
                                  )}
                                </SelectContent>

                                {errors?.format?.message && (
                                  <div className="flex gap-2 items-center text-red-700">
                                    <span className="text-xs">{errors?.format?.message}</span>
                                  </div>
                                )}
                              </Select>
                            )}
                          />
                        </div>

                        <div className="gap-3">
                          {formats === 'apresentacoes' && (
                            <>
                              <Label htmlFor="other_formats">Orientação</Label>
                              <Controller
                                control={control}
                                name="other_formats"
                                defaultValue="Horizontal"
                                render={({ field: { onChange, value } }) => (
                                  <Select
                                    onValueChange={onChange}
                                    value={value === null ? undefined : value}
                                  >
                                    <SelectTrigger
                                      aria-label="Selecione a orientação"
                                      id="other_formats"
                                    >
                                      <SelectValue placeholder="Selecione a orientação" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Horizontal">Horizontal</SelectItem>
                                      <SelectItem value="Vertical">Vertical</SelectItem>
                                    </SelectContent>

                                    {errors?.other_formats?.message && (
                                      <div className="flex gap-2 items-center text-red-700">
                                        <span className="text-xs">{errors?.other_formats?.message}</span>
                                      </div>
                                    )}
                                  </Select>
                                )}
                              />
                            </>
                          )}
                          {formats !== 'apresentacoes' && (
                            <>
                              <Label htmlFor="other_formats">Outros Formatos</Label>
                              <Input
                                id="other_formats"
                                type="text"
                                className="w-full"
                                {...register('other_formats')}
                                error={errors?.other_formats?.message}
                              />
                            </>
                          )}
                        </div>

                        <div className="gap-3">
                          <Label htmlFor="phrase">Frase Destaque</Label>
                          <Input
                            id="phrase"
                            type="text"
                            className="w-full"
                            {...register('phrase')}
                            error={errors?.phrase?.message}
                          />
                        </div>
                      </>
                    )}

                    <div className="gap-3">
                      <Label>Conteúdos</Label>
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
                      {errors?.content?.message && (
                        <div className="flex gap-2 mt-2 items-center text-red-700">
                          <span className="text-xs">{errors?.content?.message}</span>
                        </div>
                      )}
                    </div>

                    <div className="gap-3">
                      <Label>Observações</Label>
                      <Controller
                        control={control}
                        name="obs"
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
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:w-[50%] flex-1 grid auto-rows-max items-start gap-4 lg:gap-5">
              <Card x-chunk="dashboard-07-chunk-3" className="pt-6">
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid">
                      <Controller
                        control={control}
                        name="files"
                        defaultValue={null}
                        render={({ field: { onChange } }) => (
                          <Dropzone onChange={onChange} />
                        )}
                      />

                      {errors?.files?.message && (
                        <div className="flex gap-2 items-center text-red-700">
                          <span className="text-xs">{errors?.files?.message}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-center justify-center gap-2 md:ml-auto md:flex">
                <Button type="submit" size="sm">
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Solicitar
                </Button>
              </div>

              <span className="text-xs block text-gray-500">
                Psiu, não se esqueça de que o prazo para as artes on-line é de até 24h exceto finais de semanas e feriados, mas faremos de tudo pra lhe apresentar o quanto antes tá.
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
