import { Button } from "@/view/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/view/components/ui/card";

export function Help() {
  return (
    <div className="flex flex-1 w-full h-full items-center justify-center">
      <div className="grid gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-2">
        <Card
          className="sm:col-span-1 w-[300px] m-auto lg:w-[360px] lg:max-w-[100%]"
          x-chunk="dashboard-05-chunk-0"
        >
          <CardHeader className="pb-3">
            <CardTitle>Solicitações</CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Como enviar novas Solicitações
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <a href="https://www.youtube.com/watch?v=7qeT8HoG6v0" target="_blank">
                Assitir ao Vídeo
              </a>
            </Button>
          </CardFooter>
        </Card>

        <Card
          className="sm:col-span-1 w-[300px] m-auto lg:w-[360px] lg:max-w-[100%]"
          x-chunk="dashboard-05-chunk-0"
        >
          <CardHeader className="pb-3">
            <CardTitle>Atalho para Iphone</CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Criar Atalho para iphone
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <a href="https://www.youtube.com/watch?v=rhSZT-jquFc" target="_blank">
                Assitir ao Vídeo
              </a>
            </Button>
          </CardFooter>
        </Card>

        <Card
          className="sm:col-span-1 w-[300px] m-auto lg:w-[360px] lg:max-w-[100%]"
          x-chunk="dashboard-05-chunk-0"
        >
          <CardHeader className="pb-3">
            <CardTitle>Atalho para Android</CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Criar Atalho para android
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <a href="https://www.youtube.com/watch?v=k-7hO-eP5SU" target="_blank">
                Assitir ao Vídeo
              </a>
            </Button>
          </CardFooter>
        </Card>

        <Card
          className="sm:col-span-1 w-[300px] m-auto lg:w-[360px] lg:max-w-[100%]"
          x-chunk="dashboard-05-chunk-0"
        >
          <CardHeader className="pb-3">
            <CardTitle>Whatsapp</CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Fale conosco via whatsapp
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <a href="https://api.whatsapp.com/send/?phone=5541996777195&text&type=phone_number&app_absent=0" target="_blank">
                Entrar em Contato
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
