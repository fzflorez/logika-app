import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../utils/constants";
import { Button } from "../ui/Button";

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white flex flex-col justify-between z-50 border-r border-gray-100 shadow-sm">
      <div>
        {/* Logo */}
        <div>
          <Link to={ROUTES.DASHBOARD} className="flex items-center gap-3">
            <div className="w-full h-36 flex items-center justify-center bg-gray-50 bg-[url('/background-2.svg')] bg-cover bg-center">
              <img src="/logo.svg" alt="Logo bekind" className="w-44" />
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            <li>
              <Link
                to={ROUTES.DASHBOARD}
                className={`flex items-center gap-3 px-3 py-2.5 transition-colors ${
                  isActive(ROUTES.DASHBOARD)
                    ? "bg-[#EAFFFF] border-l-4 border-[#01BABB]"
                    : " hover:bg-slate-800"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                <span className="font-mediu">Acciones</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* User section */}
      <div className="p-2 border-t border-slate-700">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full flex items-center gap-2 hover:bg-slate-800 hover:text-white cursor-pointer rounded-lg transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span className="font-medium">Cerrar Sesión</span>
        </Button>
      </div>
    </aside>
  );
}
