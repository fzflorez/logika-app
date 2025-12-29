import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ROUTES } from "../utils/constants";
import axios from "axios";
import { Input } from "./ui/Input";

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
    formState: { errors, isSubmitting },
  } = useForm<LoginformData>();

  const onSubmit = async (data: LoginformData) => {
    setError(null);

    try {
      await login(data.email, data.password);
      navigate(ROUTES.DASHBOARD, { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setError(
            "Credenciales inválidas. Por favor verifica tu email y contraseña."
          );
        } else if (error.response?.status === 400) {
          setError("Datos de acceso incorrectos.");
        } else if (!error.response) {
          setError("No se pudo conectar al servicio. Verifica tu conexión.");
        } else {
          setError("Ocurrió un error inesperado. Intenta nuevamente.");
        }
      } else {
        setError("Ocurrió un error inesperado. Intenta nuevamente.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Correo Electrónico*
        </label>
        <div className="relative">
          <Input
            type="email"
            placeholder="Ingresar correo"
            autoComplete="email"
            icon={<img src="src/assets/icons/email.svg" alt="" />}
            error={errors.email?.message}
            {...register("email", {
              required: "El email es requerido",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido",
              },
            })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>

      {/* Campo Contraseña */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contraseña*
        </label>
        <div className="relative">
          <Input
            type="password"
            placeholder="Ingresa tu contraseña"
            autoComplete="current-password"
            icon={<img src="src/assets/icons/password.svg" alt="" />}
            showPasswordToggle={true}
            error={errors.password?.message}
            {...register("password", {
              required: "La contraseña es requerida",
              // NO validar longitud - el password puede venir hasheado
            })}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>

      {/* Link Recuperar Contraseña */}
      <div className="text-center">
        <a
          href="#"
          className="text-indigo-900 font-semibold underline text-sm hover:text-indigo-700"
        >
          Recuperar contraseña
        </a>
      </div>

      {/* Botón Ingresar */}
      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-gray-300 text-gray-600 font-semibold py-2 px-4 rounded-md transition-colors hover:bg-gray-400"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Iniciando sesión" : "Ingresar"}
        </button>
      </div>
    </form>
  );
}
