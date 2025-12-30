import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { useAuth } from "../../hooks/useAuth";

export function AppLayout() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      {/* Top bar */}
      <header className="fixed z-20 bg-[#1E1B4D] w-full border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="text-white">
            <h2 className="text-lg font-semibold">Panel de Administración</h2>
            <p className="text-sm">Gestiona tu plataforma BeKind</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FED639] rounded-full flex items-center justify-center">
                <span className="font-bold">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="flex-1 ml-64">
        {/* Page content */}
        <main className="p-8 pt-36">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
