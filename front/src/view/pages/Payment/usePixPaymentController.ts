import { useAuth } from "@/app/hooks/useAuth";
import { paymentsService } from "@/app/services/paymentsService";
import { PixParams } from "@/app/services/paymentsService/pix";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";



// type FormData = z.infer<typeof schema>

export function usePixPaymentController(namePlan: string | undefined, price: number | undefined, qtd: string | undefined, code: string | null) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const phoneUser = user?.data.whatsapp.replace(/\D/g, "");

  const { isPending: isLoadingPix, mutateAsync } = useMutation({
    mutationFn: async (data: PixParams) => {
      return paymentsService.pix(data);
    }
  });

  const {
    handleSubmit: hookFormSubmit,
  } = useForm<FormData>();

  const handleSubmit = hookFormSubmit(async () => {

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
        }
      }

      const response = await mutateAsync(dataRequest);

      toast.success('Pagamento Realizado!');
      navigate(`/pedido-realizado/${response[0].id}`);
      //redirect para pedidos
    } catch (error) {
      toast.error('Falha ao pagar por PIX!');
    }
  });

  return {
    handleSubmitPix: handleSubmit,
    isLoadingPix
  }
}
