import { Plan } from "@/app/entities/Plan"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/view/components/ui/alert-dialog"
import { Badge } from "@/view/components/ui/badge"
import { TableCell, TableRow } from "@/view/components/ui/table"
import { Edit, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"

interface UserItemProps {
  id: string;
  company: string;
  email: string;
  responsible: string;
  logo: string;
  level: string;
  plan: Plan;
  deleteItem(id: string): void;
}

export function UserItem({ id, company, email, responsible, logo, level, plan, deleteItem }: UserItemProps) {
  return (
    <>
      <TableRow>
        <TableCell className="hidden sm:table-cell">
          <div className="flex items-center gap-4">
            <img
              alt="Product image"
              className="aspect-square rounded-md object-contain"
              height="64"
              src={logo}
              width="64"
            />
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                {company}
              </p>
              <p className="text-sm text-muted-foreground">
                {email}
              </p>
            </div>
          </div>
        </TableCell>

        <TableCell className="font-medium">
          {responsible}
        </TableCell>
        <TableCell>
          <Badge variant="outline">{level}</Badge>
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {plan.name}
        </TableCell>
        <TableCell>
          <div className="flex gap-4">
            <Link to={`/usuarios/edit/${id}`}>
              <Edit className="w-4 h-4" />
            </Link>

            <AlertDialog>
              <AlertDialogTrigger><Trash2 className="w-4 h-4" /></AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Deseja realmente excluir?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Essa ação não pode ser desfeita. Isso excluirá permanentemente os dados de nossos servidores.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deleteItem(id)}>Confirmar</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </TableCell>
      </TableRow>
    </>
  )
}
