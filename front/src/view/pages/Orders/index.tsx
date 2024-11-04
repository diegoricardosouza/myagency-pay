import { Spinner } from "@/view/components/Spinner"
import { Card, CardContent, CardHeader, CardTitle } from "@/view/components/ui/card"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/view/components/ui/table"
import { BreadcrumbPlan } from "./components/BreadcrumbPlan"
import { OrderItem } from "./components/OrderItem"
import { useOrderController } from "./useOrderController"

export default function Orders() {
  const { orders, isLoading } = useOrderController();

  return (
    <>
      <BreadcrumbPlan />

      <div>
        <Card className="min-h-[500px] relative">
          {isLoading && (
            <div className="w-full h-full flex justify-center items-center absolute top-0 left-0">
              <Spinner className="w-6 h-6 fill-primary" />
            </div>
          )}

          <CardHeader>
            <CardTitle>Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            {!isLoading && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Cliente</TableHead>
                    <TableHead>Pacote</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Forma de Pagamento</TableHead>
                    <TableHead className="w-[130px]">
                      Preço
                    </TableHead>
                    <TableHead className="w-[150px]">
                      Data
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {orders?.map((order) => (
                    <OrderItem key={order.id} {...order} />
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
