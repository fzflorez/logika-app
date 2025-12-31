import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { useAuth } from "../../hooks/useAuth";

export function AppLayout() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />

      <header className="fixed z-20 bg-[#1E1B4D] w-full border-b border-gray-200 px-9 py-4">
        <div className="flex items-center justify-between">
          <div>
            <img
              src="/logo-white.svg"
              alt="Logo bekind white"
              className="w-full"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#FED639] rounded-full flex items-center justify-center">
                <span className="font-bold">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="flex-1 ml-64">
        <main className="p-8 pt-36">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
