import { Button } from "@/view/components/ui/button";
import { Input } from "@/view/components/ui/input";
import { Label } from "@/view/components/ui/label";

import { InputMask } from "@/view/components/InputMask";
import { Logo } from "@/view/components/Logo";
import { Loader2 } from "lucide-react";
import { Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { useRegisterController } from "./useRegisterController";

export function Register() {
  const { handleSubmit, register, errors, isPending, control } = useRegisterController();

  return (
    <>
      <div className="flex flex-col gap-2 text-center">
        <Logo className="w-[168px] ml-auto mr-auto mb-8" />

        <p className="text-balance text-muted-foreground">
          Insira suas informações para criar uma conta
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4"
      >
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
