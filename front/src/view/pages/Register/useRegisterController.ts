import { authService } from "@/app/services/authService";
import { RegisterParams } from "@/app/services/authService/register";
import { isValidCPF } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string()
            .min(1, 'O nome é de preenchimento obrigatório.'),
  company: z.string()
            .min(1, 'Empresa é de preenchimento obrigatório.'),
  responsible: z.string()
            .min(1, 'Responsável é de preenchimento obrigatório.'),
  email: z.string()
        .min(1, 'E-mail é obrigatório')
        .email('Informe um e-mail válido'),
  whatsapp: z.string()
        .min(1, 'Whatsapp é de preenchimento obrigatório.'),
  cpf: z.string()
        .min(1, 'CPF é de preenchimento obrigatório.')
        .refine((cpf) => isValidCPF(cpf), { message: "CPF inválido" }),
  password: z.string()
            .min(3, 'A senha deve conter pelo menos 3 dígitos'),
});

type FormData = z.infer<typeof schema>

export function useRegisterController() {
  const {
    register,
    handleSubmit: hookFormSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  // const { mutateAsync, isPending } = useMutation({
  //   mutationFn: async (data: SigninParams) => {
  //     return authService.signin(data);
  //   }
  // });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: RegisterParams) => {
      return authService.register(data);
    }
  });

  // const { signin } = useAuth();

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const whats = data.whatsapp.replace(/\(/g, '').replace(/\)/g, '').replace(/ /g, '').replace(/-/g, '')
      const newData = {
        ...data,
        whatsapp: whats,
        level: 'CLIENTE'
      }

      await mutateAsync(newData);

      // const { token } = await mutateAsync(data);

      // signin(token);
      toast.success("Usuário cadastrado com sucesso!");
      reset();
    } catch {
      toast.error("Credenciais inválidas");
    }
  });

  return { handleSubmit, register, errors, isPending, control };
}
