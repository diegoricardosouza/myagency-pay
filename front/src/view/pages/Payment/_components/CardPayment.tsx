import { getCardBrand } from "@/lib/utils";
import { CreditCard, Loader2 } from "lucide-react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { Icons } from "../../../components/Icons";
import { InputCreditCardMask } from "../../../components/InputCreditCardMask";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { useCardPaymentController } from "../useCardPaymentController";

interface CardPaymentProps {
  isLoading?: boolean;
}

export function CardPayment({ isLoading }: CardPaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardBrand, setCardBrand] = useState<string | null>(null);

  const { control, register, handleSubmit, errors } = useCardPaymentController();

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove qualquer caractere não numérico
    setCardBrand(getCardBrand(value));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pagamento</CardTitle>
        <CardDescription>
          Escolha a melhor forma de pagamento.
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
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" {...register('name')} placeholder="Nome Completo" error={errors.name?.message} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="number">Número do Cartão</Label>
              <div className="flex gap-3 items-start">
                <div className="w-[39px] h-[40px] flex items-center flex-[0_0_39px] justify-center">
                  {cardBrand === 'visa' && (
                    <Icons.visa className="h-[40px] w-[40px]" />
                  )}
                  {cardBrand === 'mastercard' && (
                    <Icons.mastercard className="h-[40px] w-[40px]" />
                  )}
                  {cardBrand === 'amex' && (
                    <Icons.amex className="h-[40px] w-[40px]" />
                  )}
                  {cardBrand === 'diners' && (
                    <Icons.diners className="h-[40px] w-[40px]" />
                  )}
                  {cardBrand === 'discover' && (
                    <Icons.discover className="h-[40px] w-[40px]" />
                  )}
                  {cardBrand === 'jcb' && (
                    <Icons.jcb className="h-[40px] w-[40px]" />
                  )}
                  {cardBrand === null && (
                    <CreditCard className="h-[40px] w-[30px]" />
                  )}
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Controller
                    name="card"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                      <InputCreditCardMask
                        value={value}
                        onChange={(selectedValue: string) => {
                          onChange(selectedValue);
                          handleCardNumberChange({ target: { value: selectedValue } } as React.ChangeEvent<HTMLInputElement>);
                        }}
                        error={errors.card?.message}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 items-start">
              <div className="grid gap-2">
                <Label htmlFor="month">Expiração</Label>
                <Controller
                  control={control}
                  name="mes"
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <Select
                      onValueChange={onChange}
                      value={value}
                    >
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

                      {errors?.mes?.message && (
                        <div className="flex gap-2 items-center text-red-700">
                          <span className="text-xs">{errors?.mes?.message}</span>
                        </div>
                      )}
                    </Select>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="year">Ano</Label>

                <Controller
                  control={control}
                  name="ano"
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <Select
                      onValueChange={onChange}
                      value={value}
                    >
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

                      {errors?.ano?.message && (
                        <div className="flex gap-2 items-center text-red-700">
                          <span className="text-xs">{errors?.ano?.message}</span>
                        </div>
                      )}
                    </Select>
                  )}
                />

              </div>
              <div className="grid gap-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input type="number" {...register('cvc')} id="cvc" placeholder="CVC" error={errors.cvc?.message} />
              </div>
            </div>

            <div className="grid gap-2">
              <Button className="w-full" disabled={isLoading} type="submit">
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
