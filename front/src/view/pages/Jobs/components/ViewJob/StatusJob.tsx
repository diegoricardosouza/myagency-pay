interface StatusJobProps {
  status?: string;
}

export function StatusJob({ status }: StatusJobProps) {
  return (
    <div className="flex items-center gap-2">
      {status === 'pending' && (
        <>
          <span
            className="block w-2 h-2 rounded-full bg-red-500"
          ></span>
          Pendente
        </>
      )}
      {status === 'changing' && (
        <>
          <span
            className="block w-2 h-2 rounded-full bg-yellow-500"
          ></span>
          Em Alteração
        </>
      )}
      {status === 'approving' && (
        <>
          <span
            className="block w-2 h-2 rounded-full bg-orange-500"
          ></span>
          Em Aprovação
        </>
      )}
      {status === 'approved' && (
        <>
          <span
            className="block w-2 h-2 rounded-full bg-green-500"
          ></span>
          Aprovado
        </>
      )}
    </div>
  )
}
