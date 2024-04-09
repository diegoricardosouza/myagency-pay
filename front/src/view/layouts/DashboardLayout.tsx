import {
  Menu as IconMenu
} from "lucide-react"
import { Link, Outlet } from "react-router-dom"

import { Logo } from "../components/Logo"
import { Button } from "../components/ui/button"

import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet"
import { UserMenu } from "../components/UserMenu"

import { Menu } from "../components/Menu"

export function DashboardLayout() {


  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex w-[1140px] ml-auto mr-auto max-w-[100%]">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 whitespace-nowrap">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-semibold md:text-base w-[130px]"
            >
              <Logo />
            </Link>

            <Menu />
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <IconMenu className="h-5 w-5" />
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

                <Menu />
              </nav>
            </SheetContent>
          </Sheet>

          <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <UserMenu />
          </div>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 w-[1140px] ml-auto mr-auto max-w-[100%]">
        <Outlet />
      </main>
    </div>
  )
}
