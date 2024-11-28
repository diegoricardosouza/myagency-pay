import { useAuth } from "@/app/hooks/useAuth";
import { paymentsService } from "@/app/services/paymentsService";
import { CreditCardParams } from "@/app/services/paymentsService/creditCard";
import { plansService } from "@/app/services/plansService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string()
    .min(1, 'O nome é de preenchimento obrigatório.'),
  card: z.string()
    .min(1, 'Campo de preenchimento obrigatório.'),
  mes: z.string()
    .min(1, 'Mês é obrigatório.'),
  ano: z.string()
    .min(1, 'Ano é obrigatório.'),
  cvc: z.string()
    .min(1, 'CVV é obrigatório.'),
});

type FormData = z.infer<typeof schema>

export function useCardPaymentController(namePlan: string | undefined, price: number | undefined, qtd: string | undefined, code: string | null) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('plan');
  const { user } = useAuth();
  const phoneUser = user?.data.whatsapp.replace(/\D/g, "")

  // console.log(user?.data);


  const { data, isLoading } = useQuery({
    queryKey: ['editPlanPayment', id],
    staleTime: 0,
    queryFn: async () => {
      try {
        const response = await plansService.getById(id!);
        return response;
      } catch (error) {
        toast.error('Plano não encontrado');
        navigate("/planos");
      }
    }
  });

  const {
    register,
    handleSubmit: hookFormSubmit,
    control,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { isPending: isLoadingCard, mutateAsync } = useMutation({
    mutationFn: async (data: CreditCardParams) => {
      return paymentsService.creditCard(data);
    }
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const dataRequest = {
        items: [
          {
            code: code!,
            amount: Number(price) * 100,
            description: namePlan!,
            quantity: qtd!,
          }
        ],
        customer: {
          name: user!.data.name,
          email: user!.data.email,
          document: user!.data.cpf.replace(/\D/g, ""),
          type: "individual",
          phones: {
            mobile_phone: {
              country_code: "55",
              area_code: phoneUser!.slice(0, 2),
              number: phoneUser!.slice(2)
            }
          }
        },
        payments: [
          {
            payment_method: "credit_card",
            credit_card: {
              recurrence_cycle: "first",
              installments: 1,
              statement_descriptor: "INOVASITEPAY",
              card: {
                number: data!.card,
                holder_name: data!.name,
                exp_month: Number(data!.mes),
                exp_year: Number(data!.ano),
                cvv: data!.cvc,
                billing_address: {
                  line_1: `${user!.data.number}, ${user!.data.address}, ${user!.data.neighborhood}`,
                  zip_code: user!.data.zipcode,
                  city: user!.data.city,
                  state: user!.data.state,
                  country: "BR",
                },
              },
            },
          }
        ]
      }

      const response = await mutateAsync(dataRequest);
      toast.success('Pagamento Realizado!');
      navigate(`/pedido-realizado/${response[0].id}`);
    } catch (error) {
      toast.error('Falha ao pagar por Cartão de Crédito!');
      console.log(error);

    }
  });

  return {
    plan: data?.data,
    isLoading,
    handleSubmit,
    control,
    register,
    errors,
    isLoadingCard
  }
}
