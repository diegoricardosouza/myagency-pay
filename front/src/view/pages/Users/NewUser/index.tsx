import { LEVELS, LevelProps, STATES } from "@/app/config/constants";
import { InputMask } from "@/view/components/InputMask";
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
  const { handleSubmit, errors, register, control, isPending } = useNewUserController();

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
                    <div className="grid gap-4 lg:grid-cols-2">
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
                    </div>

                    <div className="grid gap-4 lg:grid-cols-2">
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
                        <Label htmlFor="whatsapp">Whatsapp</Label>
                        <Controller
                          control={control}
                          name="whatsapp"
                          defaultValue=""
                          render={({ field: { onChange, value } }) => (
                            <InputMask
                              mask="(__) _____-____"
                              value={value}
                              onChange={onChange}
                              error={errors?.whatsapp?.message}
                            />
                          )}
                        />
                      </div>
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
                      <Label htmlFor="cpf">CPF</Label>
                      <Controller
                        control={control}
                        name="cpf"
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                          <InputMask
                            mask="___.___.___-__"
                            value={value}
                            onChange={onChange}
                            error={errors?.cpf?.message}
                          />
                        )}
                      />
                    </div>

                    <div className="grid gap-4 lg:grid-cols-3">
                      <div className="grid gap-3 col-span-2">
                        <div className="flex items-center">
                          <Label htmlFor="name">Endereço</Label>
                        </div>
                        <Input
                          id="name"
                          type="text"
                          {...register('address')}
                          error={errors?.address?.message}
                        />
                      </div>

                      <div className="grid gap-3">
                        <div className="flex items-center">
                          <Label htmlFor="name">Número</Label>
                        </div>
                        <Input
                          id="name"
                          type="number"
                          {...register('number')}
                          error={errors?.number?.message}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-3">
                      <div className="grid gap-2 col-span-2">
                        <div className="flex items-center">
                          <Label htmlFor="name">Bairro</Label>
                        </div>
                        <Input
                          id="name"
                          type="text"
                          {...register('neighborhood')}
                          error={errors?.neighborhood?.message}
                        />
                      </div>

                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <Label htmlFor="name">CEP</Label>
                        </div>
                        <Controller
                          control={control}
                          name="zipcode"
                          defaultValue=""
                          render={({ field: { onChange, value } }) => (
                            <InputMask
                              mask="_____-___"
                              value={value}
                              onChange={onChange}
                              error={errors?.zipcode?.message}
                            />
                          )}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-3">
                      <div className="grid gap-3 col-span-2">
                        <div className="flex items-center">
                          <Label htmlFor="name">Cidade</Label>
                        </div>
                        <Input
                          id="name"
                          type="text"
                          {...register('city')}
                          error={errors?.city?.message}
                        />
                      </div>

                      <div className="grid gap-3">
                        <div className="flex items-center">
                          <Label htmlFor="name">Estado</Label>
                        </div>
                        <Controller
                          control={control}
                          name="state"
                          defaultValue=""
                          render={({ field: { onChange, value } }) => (
                            <Select
                              onValueChange={onChange}
                              value={value}
                            >
                              <SelectTrigger
                                id="nivel"
                                aria-label="Selecione o estado"
                              >
                                <SelectValue placeholder="Selecione o estado" />
                              </SelectTrigger>
                              <SelectContent>
                                {STATES.map((level: LevelProps) => (
                                  <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                                ))}
                              </SelectContent>

                              {errors?.state?.message && (
                                <div className="flex gap-2 items-center text-red-700">
                                  <span className="text-xs">{errors?.state?.message}</span>
                                </div>
                              )}
                            </Select>
                          )}
                        />
                      </div>
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
