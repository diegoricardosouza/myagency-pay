import {
  CircleUser,
  Menu
} from "lucide-react"
import { Link, Outlet } from "react-router-dom"

import { useAuth } from "@/app/hooks/useAuth"
import { Logo } from "../components/Logo"
import { Button } from "../components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet"

export function DashboardLayout() {
  const { signout } = useAuth();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 whitespace-nowrap">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base w-[100px]"
          >
            <Logo />
          </Link>
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
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                to="/"
                className="flex items-center gap-2 text-lg font-semibold md:text-base"
              >
                <Logo />
              </Link>
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
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={signout} className="cursor-pointer">
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Outlet />
      </main>
    </div>
  )
}
