import { DataPicker } from "@/view/components/DataPicker";
import { Button } from "@/view/components/ui/button";
import { Card } from "@/view/components/ui/card";
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

export function Search({ control, dateEndCut, dateStartCut, handleSubmit, isLoading, day }: SerachProps) {
  return (
    <Card className="relative mb-4">
      <div className="text-center p-6 pb-0">
        <p className="text-sm text-muted-foreground">Para contagem das artes mensais, sua data de inicio é sempre dia <strong>{day}</strong>.<br />
          Selecione abaixo a data de início e data de término para verificar as suas solicitações realizadas.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-6"
      >
        <div className="flex flex-col items-center lg:flex-row lg:flex justify-center lg:items-end gap-4">
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

          <Button type="submit">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Buscar
          </Button>
        </div>
      </form>
    </Card>
  )
}
