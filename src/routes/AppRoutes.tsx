import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardPage } from "../pages/DashboardPage";
import { CreateActionPage } from "../pages/CreateActionPage";
import { ROUTES } from "../utils/constants";
import PublicRoute from "./PublicRoute";
import LoginPage from "../pages/LoginPage";
import { AppLayout } from "../components/layout/AppLayout";
import { PrivateRoute } from "./PrivateRoute";

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path={ROUTES.LOGIN}
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      <Route
        path={"/blog"}
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      <Route
        element={
          <PrivateRoute>
            <AppLayout />
          </PrivateRoute>
        }
      >
        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
        <Route path={ROUTES.CREATE_ACTION} element={<CreateActionPage />} />
      </Route>

      <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
    </Routes>
  );
}
