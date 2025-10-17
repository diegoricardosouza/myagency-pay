import { Comments } from "@/app/entities/Comments";
import { User } from "@/app/entities/User";
import illustration from "@/assets/placeholder.svg";
import { getImageCommentAdmin, identifyFileExtension } from "@/lib/utils";
import { Card } from "@/view/components/ui/card";
import { format } from "date-fns";
import 'lightbox.js-react/dist/index.css';
import { Link } from "react-router-dom";
import { PDF } from "./icons/Pdf";


interface ItemJobCard {
  id: string;
  name: string;
  dataCreated: Date;
  formats: string;
  reference: string;
  phrase?: string;
  user: User;
  comments?: Comments[]
}

export function ItemJobCard({ id, name, dataCreated, formats, reference, user, comments, phrase }: ItemJobCard) {
  const image = getImageCommentAdmin(comments!, user.id, user.level);
  const data = format(dataCreated, "dd/MM/yyyy");
  const hour = format(dataCreated, "HH:mm");
  const imageExtension = identifyFileExtension(image!);

  return (
    <Card className="relative p-0 mb-3 flex flex-col">
      <Link to={`/solicitacoes/detalhes/${id}`}>
        <div className="h-[170px] w-full rounded-sm overflow-hidden flex items-center justify-center relative border-b">
          {imageExtension === 'image' && (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          )}
          {imageExtension === 'unknown' && (
            <img src={illustration} alt={name} className="w-full h-full object-cover" />
          )}

          {imageExtension === 'pdf' && (
            <div className="w-[100px] h-[100px] lg:w-[60px] lg:h-[60px] rounded-[8px] bg-[#fff] flex items-center justify-center">
              <PDF size={60} />
            </div>
          )}

          <span className="absolute bg-primary text-white font-bold right-0 bottom-0 rounded-[10px_0_0_0] px-7 py-2 leading-[1]">
            {reference}
          </span>
        </div>

        <div className="p-3">
          <span className="block text-gray-400 uppercase text-[12px] font-medium mb-2">Formato: {formats}</span>
          <p className="text-gray-300 font-bold leading-[1] mb-1">{name}</p>
          <p className="text-primary font-bold leading-[1.3]">{phrase}</p>

          <span className="block text-gray-400 text-[12px] font-medium mt-2">
            {data} - {hour}hrs
          </span>
        </div>
      </Link>
    </Card>
  )
}
