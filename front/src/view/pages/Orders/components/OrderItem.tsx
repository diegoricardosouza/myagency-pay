import { User } from "@/app/entities/User";
import { converterPrice } from "@/lib/utils";
import { Badge } from "@/view/components/ui/badge";
import { TableCell, TableRow } from "@/view/components/ui/table";
import { formatRelative } from "date-fns";
import { ptBR } from 'date-fns/locale';
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface OrderItemProps {
  id: string;
  product: string;
  status: string;
  payment_method: string;
  price: number | string;
  date: string;
  user: User;
}

export function OrderItem({ product, status, payment_method, price, date, user, id }: OrderItemProps) {
  return (
    <>
      <TableRow>
        <TableCell className="hidden sm:table-cell">
          <div className="flex items-center gap-4">
            {user.logo && (
              <img
                alt="Product image"
                className="aspect-square rounded-md object-contain"
                height="50"
                src={user.logo}
                width="50"
              />
            )}

            <div className="grid gap-1">
              <p className="text-xs font-medium leading-none">
                {user.responsible}
              </p>
              <p className="text-xs text-muted-foreground">
                {user.company}
              </p>
            </div>
          </div>
        </TableCell>

        <TableCell className="font-medium text-xs">
          {product}
        </TableCell>
        <TableCell className="uppercase">
          {status ==='pending' && (
            <Badge variant="warning" className="px-[5px] pt-[4px] pb-[3px] text-[9px] leading-[1]">Aguardando</Badge>
          )}
          {status ==='failed' && (
            <Badge variant="destructive" className="px-[5px] pt-[4px] pb-[3px] text-[9px] leading-[1]">Falha</Badge>
          )}
          {status ==='paid' && (
            <Badge variant="success" className="px-[5px] pt-[4px] pb-[3px] text-[9px] leading-[1]">Finalizado</Badge>
          )}
        </TableCell>
        <TableCell className="font-medium text-xs">
          {payment_method === 'credit_card' && ('Cartão de Crédito')}
          {payment_method === 'pix' && ('Pix')}
        </TableCell>
        <TableCell className="font-medium text-xs">
          {converterPrice(price)}
        </TableCell>
        <TableCell className="font-medium text-xs">
          {formatRelative(date, new Date(), { locale: ptBR })}
        </TableCell>
        <TableCell className="font-medium text-xs">
          <Link to={`/pedidos/detalhes/${id}`}>
            <Eye className="w-4 h-4" />
          </Link>
        </TableCell>
      </TableRow>
    </>
  )
}
