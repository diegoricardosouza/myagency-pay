import { Button } from "@/view/components/ui/button";
import { Input } from "@/view/components/ui/input";
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
      <h4 className="font-semibold leading-none tracking-tight">QrCode</h4>
      <img src={qrcodeUrlImg} alt="Qrcode" className="mx-auto" />

      <div>
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
