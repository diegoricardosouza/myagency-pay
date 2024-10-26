import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/view/components/ui/alert-dialog";
import { TableCell, TableRow } from "@/view/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface PlanItemProps {
  id: string;
  name: string;
  quantity: string;
  price: number;
  deleteItem(id: string): void;
}

export function PlanItem({ id, name, quantity, price, deleteItem}: PlanItemProps) {
  const priceFormated = new Intl.NumberFormat('pt-br', {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2
  }).format(price)

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">
          {name}
        </TableCell>
        <TableCell className="font-medium">
          {quantity}
        </TableCell>
        <TableCell className="font-medium">
          {priceFormated}
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
