import { useAuth } from "@/app/hooks/useAuth";
import { Link } from "react-router-dom";

export function Menu() {
  const { user } = useAuth();

  return (
    <>
      <Link
        to="/"
        className="text-foreground transition-colors hover:text-foreground"
      >
        Dashboard
      </Link>

      {user?.data.level === 'ADMIN' && (
        <Link
          to="/usuarios"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Usuários
        </Link>
      )}

      <Link
        to="/planos"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Planos
      </Link>

      <Link
        to="/solicitacoes"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        {user?.data.level !== 'CLIENTE' && (
          <span>Solicitações</span>
        )}

        {(user?.data.level === 'CLIENTE') && (
          <span>Minhas Solicitações</span>
        )}
      </Link>

      <Link
        to="/ajuda"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Ajuda
      </Link>
    </>
  )
}
