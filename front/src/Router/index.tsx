import { DashboardLayout } from "@/view/layouts/DashboardLayout";
import { Help } from "@/view/pages/Help";
import { Jobs } from "@/view/pages/Jobs";
import { FormatsJob } from "@/view/pages/Jobs/components/Formats";
import { NewFormats } from "@/view/pages/Jobs/components/Formats/NewFormats";
import { ViewJob } from "@/view/pages/Jobs/components/ViewJob";
import Plans from "@/view/pages/Plans";
import { EditPlan } from "@/view/pages/Plans/components/EditPlan";
import { NewPlan } from "@/view/pages/Plans/components/NewPlan";
import { Profile } from "@/view/pages/Profile";
import User from "@/view/pages/Users";
import { EditUser } from "@/view/pages/Users/components/EditUser";
import { NewUser } from "@/view/pages/Users/components/NewUser";
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
            <Route path="/usuarios" element={<User />} />
            <Route path="/usuarios/novo" element={<NewUser />} />
            <Route path="/usuarios/edit/:id" element={<EditUser />} />
            <Route path="/planos" element={<Plans />} />
            <Route path="/planos/novo" element={<NewPlan />} />
            <Route path="/planos/edit/:id" element={<EditPlan />} />
            <Route path="/solicitacoes" element={<Jobs />} />
            <Route path="/solicitacoes/novo" element={<FormatsJob />} />
            <Route path="/solicitacoes/:formats" element={<NewFormats />} />
            <Route path="/solicitacoes/detalhes/:id" element={<ViewJob />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/ajuda" element={<Help />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}
