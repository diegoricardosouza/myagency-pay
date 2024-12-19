import { authService } from "@/app/services/authService";
import { RegisterParams } from "@/app/services/authService/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
  address: z.string()
        .min(1, 'Endereço é de preenchimento obrigatório.'),
  zipcode: z.string()
        .min(1, 'CEP é de preenchimento obrigatório.'),
  city: z.string()
        .min(1, 'Cidade é de preenchimento obrigatório.'),
  state: z.string()
        .min(1, 'Estado é de preenchimento obrigatório.'),
  number: z.string()
        .min(1, 'Número é de preenchimento obrigatório.'),
  neighborhood: z.string()
        .min(1, 'Bairro é de preenchimento obrigatório.'),
  cpf: z.string()
        .min(1, 'CPF é de preenchimento obrigatório.'),
        // .refine((cpf) => isValidCPF(cpf), { message: "CPF inválido" }),
  password: z.string()
            .min(3, 'A senha deve conter pelo menos 3 dígitos'),
});

type FormData = z.infer<typeof schema>

export function useRegisterController() {
  const navigate = useNavigate();
  const [zipcodeValid, setZipcodeValid] = useState('');
  const {
    register,
    handleSubmit: hookFormSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });
  const zipcode = watch("zipcode"); // Observa alterações no CEP

  // Chamada para ViaCEP
  useEffect(() => {
    if (zipcode) {
      setValue("address", "");
      setValue("city", "");
      setValue("state", "");
      setValue("neighborhood", "");
      setValue("number", "");
    }

    const fetchAddress = async (cep: string) => {
      setZipcodeValid("");
      if (cep?.length === 8) { // Formato completo do CEP
        try {
          const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
          if (!data.erro) {
            setValue("neighborhood", data.bairro);
            setValue("city", data.localidade);
            setValue("state", data.uf);
            setValue("address", data?.logradouro);
          } else {
            console.error("CEP inválido.");
            setZipcodeValid("CEP inválido.");
          }
        } catch (error) {
          console.error("Erro ao buscar o endereço:", error);
        }
      }
    };

    fetchAddress(zipcode);
  }, [zipcode, setValue]);

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
        level: 'CLIENTE',
        credits: 0
      }

      await mutateAsync(newData);

      // const { token } = await mutateAsync(data);

      // signin(token);
      toast.success("Usuário cadastrado com sucesso!");
      reset();
      navigate(`/login`);
    } catch {
      toast.error("Credenciais inválidas");
    }
  });

  return { handleSubmit, register, errors, isPending, control, zipcodeValid };
}
