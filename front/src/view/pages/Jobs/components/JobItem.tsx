import { User } from "@/app/entities/User";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/view/components/ui/alert-dialog";
import { TableCell, TableRow } from "@/view/components/ui/table";
import { format } from "date-fns";
import { CalendarClock, CircleCheck, EyeIcon, FileClock, Timer, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface UserJobProps {
  data: User
}

interface JobItemProps {
  id: string;
  created: string;
  format: string;
  type: string;
  status: string;
  deleteItem(id: string): void;
  user?: UserJobProps;
  jobuser?: User;
}

export function JobItem({ id, created, format: formats, type, status, deleteItem, user, jobuser }: JobItemProps) {
  const dataCreated = new Date(created);

  return (
    <>
      <TableRow>
        <TableCell className="font-normal">
          {format(dataCreated, "dd/MM/yyyy")}
        </TableCell>
        <TableCell className="font-normal">
          {format(dataCreated, "HH:mm")} Hrs
        </TableCell>
        {user?.data.level === 'ADMIN' && (
          <TableCell className="font-normal">
            {jobuser?.company}
          </TableCell>
        )}
        {/* <TableCell className="font-normal">
          {phrase}
        </TableCell> */}
        <TableCell className="font-normal">
          {formats}
        </TableCell>
        <TableCell className="font-normal">
          {type}
        </TableCell>
        <TableCell className="font-normal">
          {status === 'pending' && (
            <div className="flex items-center">
              <div className="w-7 flex justify-center items-center">
                <Timer className="w-[23px] h-[23px]" />
              </div>
              Pendente
            </div>
          )}
          {status === 'approving' && (
            <div className="flex items-center">
              <div className="w-7 flex justify-center items-center">
                <CalendarClock className="w-5 h-5" />
              </div>
              Em Aprovação
            </div>
          )}
          {status === 'changing' && (
            <div className="flex items-center">
              <div className="w-7 flex justify-center items-center">
                <FileClock className="w-5 h-5" />
              </div>
              Em Alteração
            </div>
          )}
          {status === 'approved' && (
            <div className="flex items-center">
              <div className="w-7 flex justify-center items-center">
                <CircleCheck className="w-5 h-5" />
              </div>
              Aprovado
            </div>
          )}
        </TableCell>

        <TableCell>
          <div className="flex gap-4">
            <Link to={`/solicitacoes/detalhes/${id}`}>
              <EyeIcon className="w-4 h-4" />
            </Link>

            {user?.data.level === 'ADMIN' && (
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
            )}
          </div>
        </TableCell>
      </TableRow>
    </>
  )
}
