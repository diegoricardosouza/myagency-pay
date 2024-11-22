import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/view/components/ui/breadcrumb";
import { Link } from "react-router-dom";

interface BreadcrumbEditUserProps {
  id?: string;
  profileId?: string;
}

export function BreadcrumbEditUser({ id, profileId }: BreadcrumbEditUserProps) {
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {id !== profileId && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/usuarios">Usuários</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}
        <BreadcrumbItem>
          <BreadcrumbPage>{id === profileId ? 'Meu Perfil' : 'Editar Usuário'}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
