import { converterPrice } from "@/lib/utils";
import { Spinner } from "@/view/components/Spinner";
import { Badge } from "@/view/components/ui/badge";
import { Button } from "@/view/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/view/components/ui/card";
import { BreadcrumbOrder } from "./components/BreadcrumbOrder";
import { Qrcode } from "./components/Qrcode";
import { useSuccessOrderController } from "./useSuccessOrderController";

export function SuccessOrder() {
  const { data, isLoading, handleRefresh } = useSuccessOrderController();

  return (
    <>
      <BreadcrumbOrder />

      <div className="w-full max-w-[500px] mx-auto">
        <Card className="relative">
          {isLoading && (
            <div className="bg-white rounded-lg border w-full h-full flex justify-center items-center absolute top-0 left-0">
              <Spinner className="w-6 h-6 fill-primary" />
            </div>
          )}

          <CardHeader>
            <CardTitle>Pedido realizado com sucesso!</CardTitle>
          </CardHeader>

          <CardContent>
            <div>
              <h4 className="font-semibold leading-none tracking-tight">Produto</h4>

              <div className="lg:flex justify-between">
                <p className="text-sm text-muted-foreground">{data?.data.product}</p>
                {data?.data.price && (
                  <p className="text-sm font-medium">{converterPrice(data?.data.price)}</p>
                )}
              </div>
            </div>

            <div className="mt-5">
              <h4 className="font-semibold leading-none tracking-tight">Método de Pagamento</h4>
              <p className="text-sm text-muted-foreground">
                {data?.data.payment_method === 'credit_card' && ('Cartão de Crédito')}
                {data?.data.payment_method === 'pix' && ('Pix')}
              </p>
            </div>

            <div className="mt-5">
              <h4 className="font-semibold leading-none tracking-tight mb-[5px]">Status</h4>

              {data?.data.status === 'pending' && (
                <Badge variant="warning" className="px-[5px] pt-[4px] pb-[3px] text-[13px] leading-[1]">Aguardando Pagamento</Badge>
              )}
              {data?.data.status === 'failed' && (
                <Badge variant="destructive" className="px-[5px] pt-[4px] pb-[3px] text-[13px] leading-[1]">Falha</Badge>
              )}
              {data?.data.status === 'paid' && (
                <Badge variant="success" className="px-[5px] pt-[4px] pb-[3px] text-[13px] leading-[1]">Finalizado</Badge>
              )}
            </div>

            {data?.data.qrcode && (
              <div>
                <Qrcode qrcodeUrl={data?.data.qrcode} qrcodeUrlImg={data?.data.qrcode_url} />

                <div className="flex justify-center">
                  <Button className="mt-3 bg-green-600 hover:bg-green-600/80" onClick={handleRefresh}>
                    Clique aqui se já realizou o pagamento
                  </Button>
                </div>
              </div>
            )}

            {data?.data.brand && (
              <div className="mt-5">
                <h4 className="font-semibold leading-none tracking-tight mb-[5px]">Dados do Cartão</h4>

                <p className="text-sm text-muted-foreground">Bandeira: {data?.data.brand}</p>
                <p className="text-sm text-muted-foreground">Cartão: **** **** **** {data?.data.last_four_digits}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
