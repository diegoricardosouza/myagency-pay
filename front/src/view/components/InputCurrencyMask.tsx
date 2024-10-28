import { cn } from '@/lib/utils';
import { MaskedInput, getCurrencyMaskGenerator } from 'react-hook-mask';

const maskGenerator = getCurrencyMaskGenerator({
  prefix: 'R$ ',
  thousandSeparator: '.',
  centsSeparator: ',',
});

interface InputCurrencyMaskProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
}

export function InputCurrencyMask({ value, onChange, error, className }: InputCurrencyMaskProps) {
  return (
    <>
      <MaskedInput
        maskGenerator={maskGenerator}
        value={value}
        onChange={onChange}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
          error && 'border-red-600'
        )}
      />

      {error && (
        <div className="flex gap-2 items-center text-red-700">
          <span className="text-xs">{error}</span>
        </div>
      )}
    </>
  )
}
