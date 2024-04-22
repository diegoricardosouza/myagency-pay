import { BreadcrumbDashboard } from "./components/BreadcrumbDashboard";
import { FormatsDashboard } from "./components/Formats";
import { useDashboardController } from "./useDashboardController";


export function Dashboard() {
  const { user } = useDashboardController();

  return (
    <>
      <BreadcrumbDashboard />

      {user?.data.level === 'CLIENTE' && (
        <FormatsDashboard />
      )}

      {user?.data.level !== 'CLIENTE' && (
        <div>
          <p>Dashboard Admin</p>
        </div>
      )}
    </>
  )
}
