import { DashboardLayout } from "@/view/layouts/DashboardLayout";
import { Help } from "@/view/pages/Help";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "../view/pages/Dashboard";
import { Login } from "../view/pages/Login";
import { AuthGuard } from "./AuthGuard";



export function Router() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<AuthGuard isPrivate={false} />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ajuda" element={<Help />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}
