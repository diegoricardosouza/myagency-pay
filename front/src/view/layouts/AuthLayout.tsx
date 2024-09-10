
import illustration from "@/assets/img.jpg"

import { Outlet } from "react-router-dom"


export function AuthLayout() {

  return (
    <div className="flex flex-col justify-center w-full h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2">
      <div className="flex h-screen items-center justify-center py-12 px-5 order-2 pt-0 lg:pt-12">
        <div className="mx-auto grid w-full max-w-[350px] gap-6">
          <Outlet />
        </div>
      </div>

      <div className="bg-muted lg:block order-1">
        <img
          src={illustration}
          alt="Image"
          className="h-[280px] w-full sm:h-screen object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
