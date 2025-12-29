import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../utils/constants";
import PublicRoute from "./PublicRoute";
import LoginPage from "../pages/LoginPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path={ROUTES.LOGIN}
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      ></Route>
    </Routes>
  );
}
