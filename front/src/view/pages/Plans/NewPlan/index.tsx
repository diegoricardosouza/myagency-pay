import { Button } from "@/view/components/ui/button";
import { Card, CardContent } from "@/view/components/ui/card";
import { Input } from "@/view/components/ui/input";
import { Label } from "@/view/components/ui/label";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { BreadcrumbNewPlan } from "./BreadcrumbNewPlan";
import { useNewPlanController } from "./useNewPlanController";

export function NewPlan() {
  const { handleSubmit, errors, register, isPending } = useNewPlanController();

  return (
    <>
      <BreadcrumbNewPlan />

      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto grid max-w-[900px] w-full flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-7 w-7" asChild>
              <Link to="/planos">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Adicionar Novo Plano
            </h1>
          </div>

          <form
            className="grid gap-4 md:grid-cols-1 lg:grid-cols-1 lg:gap-5"
            onSubmit={handleSubmit}
          >
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-5">
              <Card x-chunk="dashboard-07-chunk-0" className="pt-6">
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <p className="text-sm text-muted-foreground">-1 = Para ilimitado</p>
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="name">Nome</Label>
                      <Input
                        id="name"
                        type="text"
                        className="w-full"
                        {...register('name')}
                        error={errors?.name?.message}
                      />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="updates">Atualizações</Label>
                      <Input
                        id="updates"
                        type="number"
                        className="w-full"
                        {...register('updates')}
                        error={errors?.updates?.message}
                        min={-1}
                      />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="digital_midia">Mídia Digital</Label>
                      <Input
                        id="digital_midia"
                        type="number"
                        className="w-full"
                        {...register('digital_midia')}
                        error={errors?.digital_midia?.message}
                        min={-1}
                      />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="printed">Impresso</Label>
                      <Input
                        id="printed"
                        type="number"
                        className="w-full"
                        {...register('printed')}
                        error={errors?.printed?.message}
                        min={-1}
                      />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="presentations">Apresentações</Label>
                      <Input
                        id="presentations"
                        type="number"
                        className="w-full"
                        {...register('presentations')}
                        error={errors?.presentations?.message}
                        min={-1}
                      />
                    </div>

                  </div>
                </CardContent>
              </Card>

              <div className="flex items-center justify-center gap-2 md:ml-auto md:flex">
                <Button type="submit" size="sm" disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
