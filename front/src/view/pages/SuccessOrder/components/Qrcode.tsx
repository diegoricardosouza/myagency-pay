import { Button } from "@/view/components/ui/button";
import { Input } from "@/view/components/ui/input";
import { Clock } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface QrcodeProps {
  qrcodeUrlImg: string | undefined;
  qrcodeUrl: string | undefined;
}

export function Qrcode({ qrcodeUrl, qrcodeUrlImg }: QrcodeProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [qrcode, setQrcode] = useState<string>('');
  const [link, setLink] = useState('');

  useEffect(() => {
    if (qrcodeUrl) {
      setQrcode(qrcodeUrl);
    }
  }, [qrcodeUrl]);

  function handleCopy() {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value).then(() => {
        setLink('Link copiado para a área de transferência!');
      })
    }

    setTimeout(() => {
      setLink('');
    }, 1500);
  }

  return (
    <div className="mt-5">
      <h4 className="font-semibold leading-none tracking-tight mb-4">Escaneie este código QR para pagar</h4>

      <div className="px-7 mb-8">
        <ul className="flex flex-col gap-2">
          <li className="text-sm font-light">
            <strong className="font-bold">1. </strong>
            <span className="text-muted-foreground">
              Acesse seu Internet Banking ou app de pagamentos.
            </span>
          </li>
          <li className="text-sm font-light">
            <strong className="font-bold">2. </strong>
            <span className="text-muted-foreground">
              Escolha pagar via Pix.
            </span>
          </li>
          <li className="text-sm font-light">
            <strong className="font-bold">3. </strong>
            <span className="text-muted-foreground">
              Escaneie o seguinte código:
            </span>
          </li>
        </ul>
      </div>

      <img src={qrcodeUrlImg} alt="Qrcode" className="mx-auto" />

      <div className="mt-8 mb-4">
        <p className="flex text-sm font-light items-center gap-[6px]">
          <Clock className="w-4 h-4"/>
          <span className="text-muted-foreground">
            Pague e será creditado na hora.
          </span>
        </p>
      </div>

      <div className="mb-5">
        <hr />
      </div>

      <div>
        <h4 className="font-semibold leading-none tracking-tight mb-3">Ou copie este código para fazer o pagamento</h4>
        <p className="text-sm font-light text-muted-foreground mb-3">
          Escolha pagar via PIX pelo seu Internet Banking ou app de pagamentos. Depois, cole o seguinte código:
        </p>

        <div className="flex gap-3">
          <Input
            ref={inputRef}
            value={qrcode}
            onChange={(e) => setQrcode(e.target.value)} // Atualiza o estado ao editar
          />
          <Button onClick={handleCopy}>Copiar Link</Button>
        </div>

        {link && (
          <p className="mt-[5px] bg-green-500 text-white text-center rounded-sm py-2 px-4 text-[14px]">
            {link}
          </p>
        )}
      </div>
    </div>
  )
}
