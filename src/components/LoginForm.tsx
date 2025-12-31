import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ROUTES } from "../utils/constants";
import axios from "axios";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

interface LoginformData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginformData>();

  const emailValue = watch("email");
  const passwordValue = watch("password");

  const isFormFilled = !!(emailValue && passwordValue);

  const onSubmit = async (data: LoginformData) => {
    setError(null);
    try {
      await login(data.email, data.password);
      navigate(ROUTES.DASHBOARD, { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.status === 401
            ? "Credenciales inválidas"
            : "No fue posible acceder a la aplicación"
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      {error && (
        <p className="text-red-500 bg-red-50 py-2 rounded-md text-sm text-center">
          {error}
        </p>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Correo Electrónico*
        </label>
        <Input
          type="email"
          placeholder="Ingresar correo"
          icon={<img src="/icons/email.svg" alt="Icon email" />}
          error={errors.email?.message}
          {...register("email", {
            required: "El email es requerido",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email inválido",
            },
          })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contraseña*
        </label>
        <Input
          type="password"
          placeholder="Ingresa tu contraseña"
          icon={<img src="icons/password.svg" alt="Icon password" />}
          showPasswordToggle={true}
          error={errors.password?.message}
          {...register("password", {
            required: "La contraseña es requerida",
          })}
        />
      </div>

      <div className="text-center">
        <a
          href="#"
          className="text-indigo-900 font-semibold underline hover:text-indigo-700 text-sm"
        >
          Recuperar contraseña
        </a>
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          disabled={isSubmitting || !isFormFilled}
          variant="primary"
          isLoading={isSubmitting}
          className={`w-full font-semibold py-2 px-4 rounded-md transition-all duration-300 ${
            !isFormFilled
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          {isSubmitting ? "Iniciando sesión..." : "Ingresar"}
        </Button>
      </div>
    </form>
  );
}
