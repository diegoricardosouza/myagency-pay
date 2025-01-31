import { useAuth } from "@/app/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

interface VerifyLevelProps {
  level: string;
}

export function VerifyLevel({ level }: VerifyLevelProps) {
  const { user } = useAuth();

  if (user?.data.level !== level) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
