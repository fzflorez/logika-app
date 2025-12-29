import type React from "react";
import { Spinner } from "../components/ui/Spinner";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../utils/constants";

interface Props {
  children: React.ReactNode;
}
export default function PublicRoute({ children }: Props) {
  // const { isAuthenticated, isLoading } = useAuth()

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <Spinner size="lg" />
  //     </div>
  //   );
  // }

  // if (isAuthenticated) {
  //   return <Navigate to={ROUTES.DASHBOARD} replace />;
  // }

  return <>{children}</>;
}
