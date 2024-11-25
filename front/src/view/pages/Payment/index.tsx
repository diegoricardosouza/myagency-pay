import { converterPrice } from "@/lib/utils";
import { Spinner } from "@/view/components/Spinner";
import { Button } from "@/view/components/ui/button";
import { Card } from "@/view/components/ui/card";
import { CardPayment } from "@/view/pages/Payment/_components/CardPayment";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";
import { Link } from "react-router-dom";
import { usePaymentController } from "./usePaymentController";

export function Payment() {
  const { plan, id } = usePaymentController();

  return (
    <div className="flex flex-col lg:flex-row gap-7">
      <div className="flex-1">
        <Card className="p-5">
          <h3 className="font-semibold tracking-tight text-2xl mb-5">
            Pacote Escolhido
          </h3>

          <div className="flex justify-between items-center relative">
            <Suspense fallback={
              <div className="bg-white w-full h-full flex justify-center items-center absolute top-0 left-0">
                <Spinner className="w-6 h-6 fill-primary" />
              </div>
            }>
              <div>
                <h4 className="font-semibold leading-none tracking-tight">
                  {plan?.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {plan?.quantity} Arte(s)
                </p>
              </div>

              <div>
                <p className="font-semibold tracking-tight text-2xl">{converterPrice(Number(plan?.price))}</p>
              </div>
            </Suspense>
          </div>

          <div className="mt-6">
            <Button asChild>
              <Link to="/planos">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Escolher outro Pacote
              </Link>
            </Button>
          </div>
        </Card>
      </div>

      <div className="w-full max-w-96">
        <CardPayment
          code={id}
          namePlan={plan?.name}
          qtd={plan?.quantity}
          price={plan?.price}
        />
      </div>
    </div>
  )
}
