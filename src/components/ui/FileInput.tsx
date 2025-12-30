import { forwardRef, useState, type ChangeEvent } from "react";
import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from "../../utils/constants";

interface FileInputProps {
  label?: string;
  error?: string;
  onChange: (file: File | null) => void;
  accept?: string;
  placeholder?: string;
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      label,
      error,
      onChange,
      accept = "image/*",
      placeholder = "Carga archivo",
    },
    ref
  ) => {
    const [fileName, setFileName] = useState<string | null>(null);
    const [localError, setLocalError] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      setLocalError(null);

      if (!file) {
        setFileName(null);
        onChange(null);
        return;
      }

      // Validar tipo de archivo
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        setLocalError("Solo se permiten imágenes PNG o JPG");
        setFileName(null);
        onChange(null);
        return;
      }

      // Validar tamaño
      if (file.size > MAX_FILE_SIZE) {
        setLocalError("El archivo no puede superar los 5MB");
        setFileName(null);
        onChange(null);
        return;
      }

      setFileName(file.name);
      onChange(file);
    };

    const displayError = error || localError;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}

        <div
          className={`
           flex items-center justify-between border rounded-md px-4 py-3 cursor-pointer
           hover:border-gray-400 transition-colors bg-white
           ${displayError ? "border-red-500" : "border-gray-300"}
         `}
          onClick={() => {
            const input = document.getElementById("file-input");
            input?.click();
          }}
        >
          <input
            ref={ref}
            id="file-input"
            type="file"
            accept={accept}
            onChange={handleChange}
            className="hidden"
          />

          <span
            className={`text-sm ${
              fileName ? "text-gray-900" : "text-gray-500"
            }`}
          >
            {fileName || placeholder}
          </span>

          {/* Ícono de upload */}
          <img
            src="/src/assets/icons/arrow.svg"
            alt="Icono de carga"
            className="h-4 w-3"
          />
        </div>

        {displayError && (
          <p className="mt-1 text-sm text-red-600">{displayError}</p>
        )}
      </div>
    );
  }
);

FileInput.displayName = "FileInput";
