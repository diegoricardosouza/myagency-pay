import { useAuth } from "@/app/hooks/useAuth";

export function useDashboardController() {
  const { user } = useAuth();

  return {
    user
  }
}
