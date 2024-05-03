import { DataPicker } from "@/view/components/DataPicker";
import { Button } from "@/view/components/ui/button";
import { Loader2 } from "lucide-react";
import { Control, Controller } from "react-hook-form";

interface SerachProps {
  isLoading: boolean;
  handleSubmit(): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<{ startDate: Date; endDate: Date; }, any>;
  dateStartCut: string;
  dateEndCut: string;
  day: number | undefined;
}

export function ModalSearch({ control, dateEndCut, dateStartCut, handleSubmit, isLoading, day }: SerachProps) {
  return (
    <>
      <div className="text-center pb-0">
        <p className="text-sm text-muted-foreground">Para contagem das artes mensais, sua data de inicio é sempre dia <strong className="text-primary">{day}</strong>.<br />
          Selecione abaixo a data de início e data de término para verificar as suas solicitações realizadas.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-6"
      >
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
          <div>
            <Controller
              control={control}
              name="startDate"
              defaultValue={new Date(dateStartCut)}
              render={({ field: { onChange, value } }) => (
                <DataPicker
                  label="Data de Início"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>

          <div>
            <Controller
              control={control}
              name="endDate"
              defaultValue={new Date(dateEndCut)}
              render={({ field: { onChange, value } }) => (
                <DataPicker
                  label="Data de Término"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>

          <Button type="submit" className="lg:mt-6">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Buscar
          </Button>
        </div>
      </form>
    </>
  )
}
