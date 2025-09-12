import { Button } from "@/view/components/ui/button";
import { Input } from "@/view/components/ui/input";
import { Label } from "@/view/components/ui/label";

import { LevelProps, STATES } from "@/app/config/constants";
import { InputCepCardMask } from "@/view/components/InputCepCardMask";
import { InputMask } from "@/view/components/InputMask";
import { Logo } from "@/view/components/Logo";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/view/components/ui/select";
import { Loader2 } from "lucide-react";
import { Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { useRegisterController } from "./useRegisterController";

export function Register() {
  const { handleSubmit, register, errors, isPending, control, zipcodeValid } = useRegisterController();

  return (
    <>
      <div className="flex flex-col gap-2 text-center mt-5 lg:mt-0">
        <Logo className="w-[168px] ml-auto mr-auto mb-8" />

        <p className="text-balance text-muted-foreground">
          Insira suas informações para criar uma conta
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4"
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="name">Nome</Label>
            </div>
            <Input
              id="name"
              type="text"
              {...register('name')}
              error={errors?.name?.message}
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="company">Empresa</Label>
            </div>
            <Input
              id="company"
              type="text"
              {...register('company')}
              error={errors?.company?.message}
            />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="responsible">Responsável</Label>
            </div>
            <Input
              id="responsible"
              type="text"
              {...register('responsible')}
              error={errors?.responsible?.message}
            />
          </div>

          <div className="grid gap-2">
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

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register('email')}
            error={errors?.email?.message}
          />
        </div>

        <div className="grid gap-2">
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

        <div className="lg:grid gap-4 lg:grid-cols-3">
          <div className="grid gap-2 mb-2 lg:mb-0">
            <div className="flex items-center">
              <Label htmlFor="name">CEP</Label>
            </div>
            <Controller
              control={control}
              name="zipcode"
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <InputCepCardMask
                  value={value}
                  onChange={onChange}
                  error={errors?.zipcode?.message}
                />
              )}
            />
            {zipcodeValid && (
              <span className="flex gap-2 items-center text-red-700 text-xs">{zipcodeValid}</span>
            )}
          </div>

          <div className="grid gap-2 col-span-2">
            <div className="flex items-center">
              <Label htmlFor="address">Endereço</Label>
            </div>
            <Input
              id="address"
              type="text"
              {...register('address')}
              error={errors?.address?.message}
            />
          </div>
        </div>

        <div className="lg:grid gap-4 lg:grid-cols-3">
          <div className="grid gap-2 col-span-2 mb-2 lg:mb-0">
            <div className="flex items-center">
              <Label htmlFor="neighborhood">Bairro</Label>
            </div>
            <Input
              id="neighborhood"
              type="text"
              {...register('neighborhood')}
              error={errors?.neighborhood?.message}
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="number">Número</Label>
            </div>
            <Input
              id="number"
              type="number"
              {...register('number')}
              error={errors?.number?.message}
            />
          </div>
        </div>

        <div className="lg:grid gap-4 lg:grid-cols-3">
          <div className="grid gap-2 col-span-2">
            <div className="flex items-center">
              <Label htmlFor="city">Cidade</Label>
            </div>
            <Input
              id="city"
              type="text"
              {...register('city')}
              error={errors?.city?.message}
            />
          </div>

          <div className="grid gap-2 mt-2 lg:mt-0">
            <div className="flex items-center">
              <Label htmlFor="state">Estado</Label>
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
                    id="state"
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

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            id="password"
            type="password"
            {...register('password')}
            error={errors?.password?.message}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Criar Conta
        </Button>
      </form>

      <div className="text-center text-sm text-muted-foreground">
        Já tem uma conta?{" "}
        <Link to="/login" className="underline">
          Entrar
        </Link>
      </div>
    </>
  )
}
