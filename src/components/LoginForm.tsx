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
    watch, // 1. Agregamos watch para observar los cambios
    formState: { errors, isSubmitting },
  } = useForm<LoginformData>();

  // 2. Observamos los valores de email y password
  const emailValue = watch("email");
  const passwordValue = watch("password");

  // 3. Verificamos si ambos campos tienen contenido
  const isFormFilled = emailValue && passwordValue;

  const onSubmit = async (data: LoginformData) => {
    setError(null);
    try {
      await login(data.email, data.password);
      navigate(ROUTES.DASHBOARD, { replace: true });
    } catch (error) {
      // ... (tu lógica de errores se mantiene igual)
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.status === 401
            ? "Credenciales inválidas"
            : "Error de acceso"
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      {/* Campo Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Correo Electrónico*
        </label>
        <Input
          type="email"
          placeholder="Ingresar correo"
          icon={<img src="src/assets/icons/email.svg" alt="" />}
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

      {/* Campo Contraseña */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contraseña*
        </label>
        <Input
          type="password"
          placeholder="Ingresa tu contraseña"
          icon={<img src="src/assets/icons/password.svg" alt="" />}
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

      {/* 4. Botón Dinámico */}
      <div className="pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="secondary"
          className={`w-full font-semibold py-2 px-4 rounded-md transition-all duration-300 ${
            !isFormFilled && "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? "Iniciando sesión..." : "Ingresar"}
        </Button>
      </div>
    </form>
  );
}
