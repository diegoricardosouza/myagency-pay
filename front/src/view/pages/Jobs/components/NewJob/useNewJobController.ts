import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  site: z.string()
    .optional()
    .nullable(),
  page: z.string()
    .optional()
    .nullable(),
  format: z.string()
    .min(1, 'Formato é obrigatório'),
  other_formats: z.string()
    .optional()
    .nullable(),
  phrase: z.string()
    .optional()
    .nullable(),
  content: z.string()
    .min(1, 'Conteúdo é obrigatório'),
  obs: z.string()
    .optional()
    .nullable(),
});

type FormData = z.infer<typeof schema>

export function useNewJobController() {
  const {
    register,
    handleSubmit: hookFormSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      console.log('ok', data);

    } catch (error) {
      toast.error('Erro ao cadastrar o usuário');
    }
  });

  return {
    register,
    control,
    reset,
    errors,
    handleSubmit
  }
}
