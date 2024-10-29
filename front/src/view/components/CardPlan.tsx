import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface CardPlanProps {
  id: string;
  name: string;
  price: number;
  quantity: string;
}

export function CardPlan({ id, name, price, quantity }: CardPlanProps) {
  const priceFormated = new Intl.NumberFormat('pt-br', {
    currency: "BRL",
    minimumFractionDigits: 2
  }).format(price)

  return (
    <Card className="py-8 px-8">
      <strong className="font-bold uppercase text-primary text-[12px] tracking-wider mb-9 block">
        {name}
      </strong>

      <div className="flex items-end">
        <span className="font-bold text-[16px]">R$</span>
        <span className="font-bold text-[50px] leading-[48px] tracking-tighter">
          {priceFormated}
        </span>
      </div>

      <div className="mt-8">
        <ul className="space-y-3">
          <li className="text-[14px] text-gray-700 flex gap-2 items-center">
            <Check className="text-green-600" size={20} /> {quantity} Arte(s)
          </li>
          <li className="text-[14px] text-gray-700 flex gap-2 items-center">
            <Check className="text-green-600" size={20} /> Artes sem data de validade
          </li>
        </ul>
      </div>

      <div className="mt-7">
        <Button asChild className="inline-flex gap-2 px-4 py-6 font-normal" size="lg">
          <Link to={`/pagamento?plan=${id}`}>
            Contratar Agora <ArrowRight size={18} />
          </Link>
        </Button>
      </div>
    </Card>
  )
}
