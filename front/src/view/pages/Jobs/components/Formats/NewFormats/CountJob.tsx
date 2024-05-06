import { Spinner } from "@/view/components/Spinner";

interface CountJobProps {
  level: string | undefined;
  exceeded: boolean;
  JobsAvailable: string | number | undefined
  isLoading: boolean;
}


export function CountJob({ level, exceeded, JobsAvailable, isLoading }: CountJobProps) {
  return (
    <>
      {(!exceeded && level === 'CLIENTE') && (
        <div className="relative">
          {isLoading && (
            <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 bg-white">
              <Spinner className="w-6 h-6 fill-primary" />
            </div>
          )}

          <div className="p-6 bg-green-100 border border-green-300 rounded-md transition-all">
            <p className="text-sm text-center text-green-800">
              Você ainda possui&nbsp;
              <strong>
                {isNaN(Number(JobsAvailable)) || Number(JobsAvailable) === -1
                  ? 'Ilimitadas'
                  : Number(JobsAvailable)}
              </strong>
              &nbsp;solicitações disponíveis
            </p>
          </div>
        </div>
      )}

      {(exceeded && level === 'CLIENTE') && (
        <div className="relative">
          {isLoading && (
            <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 bg-white">
              <Spinner className="w-6 h-6 fill-primary" />
            </div>
          )}

          <div className="p-6 bg-red-100 border border-red-300 rounded-md transition-all">
            <p className="text-sm text-center text-red-800">
              Atualmente, não há solicitações disponíveis, caso você crie uma nova solicitação,
              <strong> vai ser cobrado avulso</strong>.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
