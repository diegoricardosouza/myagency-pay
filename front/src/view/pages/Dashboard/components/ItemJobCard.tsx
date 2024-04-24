import { Card } from "@/view/components/ui/card";
import { Link } from "react-router-dom";

interface ItemJobCard {
  id: string;
  name: string;
  data: string;
  hour: string;
  format: string;
  reference: string;
}

export function ItemJobCard({ id, name, data, hour, format, reference }: ItemJobCard) {
  return (
    <Card className="relative p-3 mb-3">
      <div className="flex items-center">
        <h2 className="font-semibold">{name}</h2>
      </div>

      <div>
        <div>
          <p className="ml-auto text-xs text-muted-foreground">Data: {data}</p>
          <p className="ml-auto text-xs text-muted-foreground">Hora: {hour} Hrs</p>
          <p className="ml-auto text-xs text-muted-foreground">Formato: {format}</p>
          <p className="ml-auto text-xs text-muted-foreground">Ref: {reference}</p>
          <Link to={`/solicitacoes/detalhes/${id}`} className="inline-flex items-center rounded-md border px-2.5 py-1 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80 mt-1">
            Ver mais
          </Link>
        </div>
      </div>
    </Card>
  )
}
