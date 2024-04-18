import { Button } from "@/view/components/ui/button";
import { Card, CardContent } from "@/view/components/ui/card";
import { Input } from "@/view/components/ui/input";
import { Label } from "@/view/components/ui/label";

import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { BreadcrumbPlNewJob } from "./BreadcrumbNewJob";
import { useNewJobController } from "./useNewJobController";

export function NewJob() {
  const {
    errors,
    handleSubmit,
    register,
  } = useNewJobController()

  return (
    <>
      <BreadcrumbPlNewJob />

      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-7 w-7" asChild>
              <Link to="/solicitacoes">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Adicionar Nova Solicitação
            </h1>
          </div>

          <form
            className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-5"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-5">
              <Card x-chunk="dashboard-07-chunk-0" className="pt-6">
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="name">Site</Label>
                      <Input
                        id="name"
                        type="text"
                        className="w-full"
                        {...register('site')}
                        error={errors?.site?.message}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid auto-rows-max items-start gap-4 lg:gap-5">
              <Card x-chunk="dashboard-07-chunk-3" className="pt-6">
                <CardContent>
                  <div className="grid gap-6">
                    {/* <div className="grid gap-3">
                      <Label htmlFor="logo">Logo</Label>
                      <Input
                        id="logo"
                        type="file"
                        {...register('logo')}
                        error={errors?.logo?.message}
                      />
                    </div> */}

                    <div className="grid gap-3">
                      <Label htmlFor="nivel">Nível</Label>
                      {/* <Controller
                        control={control}
                        name="level"
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                          <Select
                            onValueChange={onChange}
                            value={value}
                          >
                            <SelectTrigger
                              id="nivel"
                              aria-label="Selecione o nível"
                            >
                              <SelectValue placeholder="Selecione o nível" />
                            </SelectTrigger>
                            <SelectContent>
                              {LEVELS.map((level: LevelProps) => (
                                <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                              ))}
                            </SelectContent>

                            {errors?.level?.message && (
                              <div className="flex gap-2 items-center text-red-700">
                                <span className="text-xs">{errors?.level?.message}</span>
                              </div>
                            )}
                          </Select>
                        )}
                      /> */}
                    </div>

                    <div className="grid gap-3">

                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-center justify-center gap-2 md:ml-auto md:flex">
                <Button type="submit" size="sm">

                  Cadastrar
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
