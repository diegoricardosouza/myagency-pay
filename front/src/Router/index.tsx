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
          <Route path="/" element={<Dashboard />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}