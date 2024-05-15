import { LEVELS, LevelProps } from "@/app/config/constants";
import { Button } from "@/view/components/ui/button";
import { Card, CardContent } from "@/view/components/ui/card";
import { Input } from "@/view/components/ui/input";
import { Label } from "@/view/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/view/components/ui/select";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { BreadcrumbNewUser } from "./BreadcrumbNewUser";
import { useNewUserController } from "./useNewUserController";

export function NewUser() {
  const { dayNow, handleSubmit, errors, register, control, isPending, plans, isFetching } = useNewUserController();

  return (
    <>
      <BreadcrumbNewUser />

      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto grid max-w-[900px] w-full flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-7 w-7" asChild>
              <Link to="/usuarios">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Adicionar Novo Usuário
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
                      <Label htmlFor="company">Empresa</Label>
                      <Input
                        id="company"
                        type="text"
                        className="w-full"
                        {...register('company')}
                        error={errors?.company?.message}
                      />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="responsible">Responsável</Label>
                      <Input
                        id="responsible"
                        type="text"
                        className="w-full"
                        {...register('responsible')}
                        error={errors?.responsible?.message}
                      />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="text"
                        className="w-full"
                        {...register('email')}
                        error={errors?.email?.message}
                      />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="whatsapp">Whatsapp</Label>
                      <Input
                        id="whatsapp"
                        type="text"
                        className="w-full"
                        {...register('whatsapp')}
                        error={errors?.whatsapp?.message}
                        placeholder="Ex.: 5541999999999"
                      />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="day">Dia de Corte</Label>
                      <Input
                        id="day"
                        type="number"
                        className="w-full"
                        defaultValue={dayNow}
                        min={1}
                        max={31}
                        {...register('day')}
                        error={errors?.day?.message}
                      />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="password">Senha</Label>
                      <Input
                        id="password"
                        type="password"
                        className="w-full"
                        {...register('password')}
                        error={errors?.password?.message}
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
                    <div className="grid gap-3">
                      <Label htmlFor="logo">Logo</Label>
                      <Input
                        id="logo"
                        type="file"
                        {...register('logo')}
                        error={errors?.logo?.message}
                      />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="nivel">Nível</Label>
                      <Controller
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
                      />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="plano">Plano</Label>
                      <Controller
                        control={control}
                        name="plan_id"
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                          <Select
                            onValueChange={onChange}
                            value={value}
                            disabled={isFetching}
                          >
                            <SelectTrigger
                              id="plano"
                              aria-label="Selecione o plano"
                              >
                              {isFetching && (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  <SelectValue placeholder="Carregando..." />
                                </>
                              )}
                              {!isFetching && <SelectValue placeholder="Selecione o plano" />}
                            </SelectTrigger>
                            <SelectContent>
                              {plans.map((plan) => (
                                <SelectItem key={plan.id} value={plan.id}>{plan.name}</SelectItem>
                              ))}
                            </SelectContent>

                            {errors?.plan_id?.message && (
                              <div className="flex gap-2 items-center text-red-700">
                                <span className="text-xs">{errors?.plan_id?.message}</span>
                              </div>
                            )}
                          </Select>
                        )}
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
