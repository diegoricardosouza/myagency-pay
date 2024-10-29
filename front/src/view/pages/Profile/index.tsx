import { useAuth } from "@/app/hooks/useAuth";
import { Card, CardContent } from "@/view/components/ui/card";
import { Label } from "@/view/components/ui/label";
import { BreadcrumbProfile } from "./BreadcrumbProfile";

export function Profile() {
  const { user } = useAuth();

  return (
    <>
      <BreadcrumbProfile />

      <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
        <div>
          <h2 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 mb-2">
            Seus Dados
          </h2>
          <Card x-chunk="dashboard-07-chunk-0" className="pt-6">
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-1">
                  <Label>Nome:</Label>
                  <p className="text-muted-foreground text-sm">{user?.data.name}</p>
                </div>

                <div className="grid gap-1">
                  <Label>Empresa:</Label>
                  <p className="text-muted-foreground text-sm">{user?.data.company}</p>
                </div>

                <div className="grid gap-1">
                  <Label>Responsável:</Label>
                  <p className="text-muted-foreground text-sm">{user?.data.responsible}</p>
                </div>

                <div className="grid gap-1">
                  <Label>Email:</Label>
                  <p className="text-muted-foreground text-sm">{user?.data.email}</p>
                </div>

                <div className="grid gap-1">
                  <Label>WhatsApp:</Label>
                  <p className="text-muted-foreground text-sm">{user?.data.whatsapp}</p>
                </div>

                <div className="grid gap-1">
                  <Label>CPF:</Label>
                  <p className="text-muted-foreground text-sm">{user?.data.cpf}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
