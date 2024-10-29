import { converterPrice } from "@/lib/utils";
import { CardPayment } from "@/view/components/CardPayment";
import { Spinner } from "@/view/components/Spinner";
import { Card } from "@/view/components/ui/card";
import { Suspense } from "react";
import { usePaymentController } from "./usePaymentController";

export function Payment() {
  const { plan } = usePaymentController();

  return (
    <div className="flex gap-7">
      <div className="flex-1">
        <Card className="p-5">
          <h3 className="font-semibold tracking-tight text-2xl mb-5">
            Checkout
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
        </Card>
      </div>

      <div className="w-full max-w-96">
        <CardPayment />
      </div>
    </div>
  )
}
