import { Link } from "react-router-dom";
import { ActionsTable } from "../components/ActionsTable";
import { Button } from "../components/ui/Button";
import { ROUTES } from "../utils/constants";
import { useActions } from "../hooks/useActions";

export function DashboardPage() {
  const { actions, isLoading, error, pagination, goToPage, refresh } =
    useActions();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#1E1B4D]">Acciones</h1>
        </div>
        <Link to={ROUTES.CREATE_ACTION}>
          <Button variant="primary" className="cursor-pointer">
            Nueva Acción
          </Button>
        </Link>
      </div>

      <ActionsTable
        actions={actions}
        isLoading={isLoading}
        error={error}
        pagination={pagination}
        onPageChange={goToPage}
        onRetry={refresh}
      />
    </div>
  );
}
