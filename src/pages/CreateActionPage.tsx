import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Alert } from "../components/ui/Alert";
import { ROUTES } from "../utils/constants";
import axios from "axios";
import { actionsService } from "../services/ActionsService";
import { TextArea } from "../components/ui/TextArea";
import { Toggle } from "../components/ui/Toggle";
import { FileInput } from "../components/ui/FileInput";
import { ColorPicker } from "../components/ui/ColorPicker";

interface CreateActionFormData {
  name: string;
  description: string;
  color: string;
  status: string;
}

export function CreateActionPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateActionFormData>({
    defaultValues: {
      name: "",
      description: "",
      color: "#3B82F6",
      status: "1",
    },
  });

  const nameValue = watch("name");
  const descriptionValue = watch("description");
  const colorValue = watch("color");

  const isFormFilled = !!(
    nameValue &&
    descriptionValue &&
    colorValue &&
    selectedFile
  );

  const onSubmit = async (data: CreateActionFormData) => {
    setError(null);
    setFileError(null);

    // Validate file
    if (!selectedFile) {
      setFileError("La imagen es obligatoria");
      return;
    }

    try {
      await actionsService.createAction({
        name: data.name,
        description: data.description,
        color: data.color,
        status: data.status,
        icon: selectedFile,
      });

      setSuccess(true);

      setTimeout(() => {
        navigate(ROUTES.DASHBOARD, { replace: true });
      }, 1500);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log("err:", err.response?.status);
        if (err.response?.status === 400) {
          setError("Datos inválidos. Por favor verifica los campos.");
        } else if (err.response?.status === 401) {
          setError("Sesión expirada. Por favor inicia sesión nuevamente.");
        } else {
          setError("Error al crear la acción. Intenta nuevamente.");
        }
      } else {
        setError("Error inesperado. Intenta nuevamente.");
      }
    }
  };

  // Validate color hex format
  const isValidHexColor = (color: string) => {
    return /^#[0-9A-Fa-f]{6}$/.test(color);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          to={ROUTES.DASHBOARD}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver al listado
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Crear acción</h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6"
      >
        {/* Name */}
        <Input
          label="Nombre *"
          placeholder="Escribe el nombre de la buena acción"
          error={errors.name?.message}
          disabled={isSubmitting || success}
          {...register("name", {
            required: "El nombre es requerido",
            maxLength: {
              value: 100,
              message: "El nombre no puede superar los 100 caracteres",
            },
          })}
        />

        {/* Description */}
        <TextArea
          label="Descripción *"
          placeholder="Agregar descripción"
          error={errors.description?.message}
          disabled={isSubmitting || success}
          {...register("description", {
            required: "La descripción es requerida",
            maxLength: {
              value: 500,
              message: "La descripción no puede superar los 500 caracteres",
            },
          })}
        />

        {/* Image */}
        <FileInput
          label="Logo *"
          error={fileError || undefined}
          onChange={(file) => {
            setSelectedFile(file);
            if (file) {
              setFileError(null);
            } else {
              setFileError("El logo es obligatorio");
            }
          }}
        />

        {/* Color */}
        <Controller
          name="color"
          control={control}
          rules={{
            required: "El color es requerido",
            validate: (value) =>
              isValidHexColor(value) ||
              "Formato de color inválido (ej: #FF5733)",
          }}
          render={({ field }) => (
            <ColorPicker
              label="Color *"
              error={errors.color?.message}
              disabled={isSubmitting || success}
              {...field}
            />
          )}
        />

        {/* Status */}
        <Controller
          name="status"
          control={control}
          rules={{ required: "El estado es requerido" }}
          render={({ field }) => (
            <Toggle
              label="Estado *"
              checked={field.value === "1"}
              onChange={(checked) => field.onChange(checked ? "1" : "0")}
              error={errors.status?.message}
              disabled={isSubmitting || success}
              activeLabel="Activo"
              inactiveLabel="Inactivo"
            />
          )}
        />

        <div className="mt-20">
          {/* State messages */}
          {success && (
            <div className="mb-3">
              <Alert type="success" message="¡Acción creada exitosamente!" />
            </div>
          )}

          {error && (
            <div className="mb-6">
              <Alert
                type="error"
                message={error}
                onClose={() => setError(null)}
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Link to={ROUTES.DASHBOARD} className="flex-1">
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting || success}
                fullWidth
              >
                Cancelar
              </Button>
            </Link>
            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting || success || !isFormFilled}
              fullWidth
              variant="primary"
              className={`flex-1 ${
                !isFormFilled
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              {isSubmitting ? "Creando..." : "Crear"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
