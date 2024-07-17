import { Comments } from "@/app/entities/Comments";
import { User } from "@/app/entities/User";
import illustration from "@/assets/placeholder.svg";
import { getImageCommentAdmin } from "@/lib/utils";
import { Card } from "@/view/components/ui/card";
import { format } from "date-fns";
import { Image } from "lightbox.js-react";
import 'lightbox.js-react/dist/index.css';
import { Link } from "react-router-dom";

interface ItemJobCard {
  id: string;
  name: string;
  dataCreated: Date;
  formats: string;
  reference: string;
  user: User;
  comments?: Comments[]
}

export function ItemJobCard({ id, name, dataCreated, formats, reference, user, comments }: ItemJobCard) {
  const image = getImageCommentAdmin(comments!, user.id, user.level);
  const data = format(dataCreated, "dd/MM/yyyy");
  const hour = format(dataCreated, "HH:mm");

  return (
    <Card className="relative p-3 mb-3 flex gap-3">
      {image && (
        <Image
          className="aspect-square rounded-lg mb-1 w-[100px] h-[100px] md:w-[60px] md:h-[60px] object-cover"
          image={{ src: image, title: name  }}
          modalClose="clickOutside"
        />
      )}
      {!image && (
        <Image
          className="aspect-square rounded-lg mb-1 w-[100px] h-[100px] md:w-[60px] md:h-[60px] object-cover"
          image={{src: illustration, title: name  }}
          modalClose="clickOutside"
        />
      )}

      <div className="flex-1">
        {user.level !== 'CLIENTE' && (
          <h2 className="font-semibold break-w leading-[18px] mb-[5px]">{name}</h2>
        )}

        <div>
          <p className="text-xs text-muted-foreground">Data: {data}</p>
          <p className="text-xs text-muted-foreground">Hora: {hour} Hrs</p>
          <p className="text-xs text-muted-foreground">Formato: {formats}</p>
          <p className="text-xs text-muted-foreground">Ref: {reference}</p>
          <Link to={`/solicitacoes/detalhes/${id}`} className="inline-flex items-center rounded-md border px-2.5 py-1 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80 mt-1">
            Ver mais
          </Link>
        </div>
      </div>
    </Card>
  )
}
