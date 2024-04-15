import { TableCell, TableRow } from "@/view/components/ui/table";
import { format } from "date-fns";
import { EyeIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface JobItemProps {
  id: string;
  created: string;
  phrase: string;
  format: string;
}

export function JobItem({ id, created, phrase, format: formats }: JobItemProps) {
  const dataCreated = new Date(created);

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">
          {format(dataCreated, "dd/MM/yyyy")}
        </TableCell>
        <TableCell className="font-medium">
          {format(dataCreated, "H:m")}
        </TableCell>
        <TableCell className="font-medium">
          {phrase}
        </TableCell>
        <TableCell className="font-medium">
          {formats}
        </TableCell>

        <TableCell>
          <div className="flex gap-4">
            <Link to={`/solicitacoes/detalhes/${id}`}>
              <EyeIcon className="w-4 h-4" />
            </Link>
          </div>
        </TableCell>
      </TableRow>
    </>
  )
}
