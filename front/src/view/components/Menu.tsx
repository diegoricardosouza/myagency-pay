import { Link } from "react-router-dom";

export function Menu() {
  return (
    <>
      <Link
        to="/"
        className="text-foreground transition-colors hover:text-foreground"
      >
        Dashboard
      </Link>
      <Link
        to="#"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Minhas Solicitações
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
