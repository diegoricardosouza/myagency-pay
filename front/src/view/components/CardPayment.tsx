import { CreditCard, Loader2 } from "lucide-react";
import { useState } from "react";
import { Icons } from "./Icons";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface CardPaymentProps {
  isLoading?: boolean;
}

export function CardPayment({ isLoading }: CardPaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pagamento</CardTitle>
        <CardDescription>
          Add a new payment method to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <RadioGroup
          defaultValue="card"
          className="grid grid-cols-2 gap-4"
          onValueChange={(value) => setPaymentMethod(value)}
        >
          <div>
            <RadioGroupItem
              value="card"
              id="card"
              className="peer sr-only"
              aria-label="Card"
            />
            <Label
              htmlFor="card"
              className="cursor-pointer flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <CreditCard className="mb-3 h-6 w-6" />
              Cartão de Crédito
            </Label>
          </div>

          <div>
            <RadioGroupItem
              value="pix"
              id="pix"
              className="peer sr-only"
              aria-label="Pix"
            />
            <Label
              htmlFor="pix"
              className="cursor-pointer flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Icons.pix className="mb-3 h-6 w-6" />
              Pix
            </Label>
          </div>
        </RadioGroup>

        {paymentMethod === 'card' && (
          <form className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" placeholder="Nome Completo" maxLength={2} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="number">Número do Cartão</Label>
              <Input id="number" placeholder="" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="month">Expiração</Label>
                <Select>
                  <SelectTrigger id="month" aria-label="Mês">
                    <SelectValue placeholder="Mês" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Janeiro</SelectItem>
                    <SelectItem value="2">Fevereiro</SelectItem>
                    <SelectItem value="3">Março</SelectItem>
                    <SelectItem value="4">Abril</SelectItem>
                    <SelectItem value="5">Maio</SelectItem>
                    <SelectItem value="6">Junho</SelectItem>
                    <SelectItem value="7">Julho</SelectItem>
                    <SelectItem value="8">Agosto</SelectItem>
                    <SelectItem value="9">Setembro</SelectItem>
                    <SelectItem value="10">Outubro</SelectItem>
                    <SelectItem value="11">Novembro</SelectItem>
                    <SelectItem value="12">Dezembro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="year">Ano</Label>
                <Select>
                  <SelectTrigger id="year" aria-label="Ano">
                    <SelectValue placeholder="Ano" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 20 }, (_, i) => (
                      <SelectItem key={i} value={`${new Date().getFullYear() + i}`}>
                        {new Date().getFullYear() + i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input type="number" id="cvc" placeholder="CVC" max={999} />
              </div>
            </div>

            <div className="grid gap-2">
              <Button className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                {!isLoading && <span>Pagar</span>}
              </Button>
            </div>
          </form>
        )}
      </CardContent>
      {paymentMethod === 'pix' && (
        <CardFooter>
          <Button className="w-full">Pagar</Button>
        </CardFooter>
      )}
    </Card>
  )
}
