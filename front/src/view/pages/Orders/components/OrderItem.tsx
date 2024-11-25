import { User } from "@/app/entities/User";
import { converterPrice } from "@/lib/utils";
import { Badge } from "@/view/components/ui/badge";
import { TableCell, TableRow } from "@/view/components/ui/table";
import { formatRelative } from "date-fns";
import { ptBR } from 'date-fns/locale';

interface OrderItemProps {
  product: string;
  status: string;
  payment_method: string;
  price: number | string;
  date: string;
  user: User;
}

export function OrderItem({ product, status, payment_method, price, date, user }: OrderItemProps) {
  return (
    <>
      <TableRow>
        <TableCell className="hidden sm:table-cell">
          <div className="flex items-center gap-4">
            {user.logo && (
              <img
                alt="Product image"
                className="aspect-square rounded-md object-contain"
                height="64"
                src={user.logo}
                width="64"
              />
            )}

            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                {user.company}
              </p>
              <p className="text-sm text-muted-foreground">
                {user.email}
              </p>
            </div>
          </div>
        </TableCell>

        <TableCell className="font-medium">
          {product}
        </TableCell>
        <TableCell className="uppercase">
          {status ==='pending' && (
            <Badge variant="warning" className="text-[11px]">Aguardando</Badge>
          )}
          {status ==='failed' && (
            <Badge variant="destructive" className="text-[11px]">Cancelado</Badge>
          )}
          {status ==='paid' && (
            <Badge variant="success" className="text-[11px]">Finalizado</Badge>
          )}
        </TableCell>
        <TableCell className="font-medium">
          {payment_method === 'credit_card' && ('Cartão de Crédito')}
          {payment_method === 'pix' && ('Pix')}
        </TableCell>
        <TableCell className="font-medium">
          {converterPrice(price)}
        </TableCell>
        <TableCell className="font-medium">
          {formatRelative(date, new Date(), { locale: ptBR })}
        </TableCell>
      </TableRow>
    </>
  )
}
