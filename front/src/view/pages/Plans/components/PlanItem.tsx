import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/view/components/ui/alert-dialog";
import { TableCell, TableRow } from "@/view/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface PlanItemProps {
  id: string;
  name: string;
  updates: string;
  digital_midia: string;
  printed: string;
  presentations: string;
  deleteItem(id: string): void;
}

export function PlanItem({ id, name, updates, digital_midia, printed, presentations, deleteItem}: PlanItemProps) {
  return (
    <>
      <TableRow>
        <TableCell className="font-medium">
          {name}
        </TableCell>
        <TableCell className="font-medium">
          {String(updates) === "-1" ? 'ilimitado' : updates}
        </TableCell>
        <TableCell className="font-medium">
          {String(digital_midia) === "-1" ? 'ilimitado' : digital_midia}
        </TableCell>
        <TableCell className="font-medium">
          {String(printed) === "-1" ? 'ilimitado' : printed}
        </TableCell>
        <TableCell className="font-medium">
          {String(presentations) === "-1" ? 'ilimitado' : presentations}
        </TableCell>

        <TableCell>
          <div className="flex gap-4">
            <Link to={`/planos/edit/${id}`}>
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
