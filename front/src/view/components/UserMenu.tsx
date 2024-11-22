import { useAuth } from "@/app/hooks/useAuth";
import coin from "@/assets/icon-coin.gif";
import { useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { Button } from "./ui/button";

export function UserMenu() {
  const { signout, user } = useAuth();
  const navigate = useNavigate();

  function handleMyProfile() {
    navigate(`/usuarios/edit/${user?.data.id}`)
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <img src={coin} alt="" className="w-[30px]" />
        <span className="text-[13px]">{user?.data.credits} Crédito(s)</span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full overflow-hidden">
            <img src={user?.data.logo} alt="" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onSelect={handleMyProfile}>
            Meu Perfil
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={signout} className="cursor-pointer">
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
