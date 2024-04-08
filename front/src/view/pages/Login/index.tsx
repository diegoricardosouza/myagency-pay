import { Button } from "@/view/components/ui/button";
import { Input } from "@/view/components/ui/input";
import { Label } from "@/view/components/ui/label";

import illustration from "@/assets/placeholder.svg";
import { useLoginController } from "./useLoginController";

export function Login() {
  const { handleSubmit, register, errors, isPending } = useLoginController();

  return (
    <div className="w-full h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2">
      <div className="flex h-screen items-center justify-center py-12 px-5">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Entrar</h1>
            <p className="text-balance text-muted-foreground">
              Digite seu e-mail abaixo para fazer login
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid gap-4"
          >
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
              Login
            </Button>
          </form>
        </div>
      </div>

      <div className="hidden bg-muted lg:block">
        <img
          src={illustration}
          alt="Image"
          width="1920"
          height="1080"
          className="h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
