import { forwardRef } from "react";

interface ToggleProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  error?: string;
  activeLabel?: string;
  inactiveLabel?: string;
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      label,
      checked = false,
      onChange,
      disabled = false,
      error,
      activeLabel = "Activo",
      inactiveLabel = "Inactivo",
    },
    ref
  ) => {
    const handleToggle = () => {
      if (!disabled && onChange) {
        onChange(!checked);
      }
    };

    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="flex items-center gap-3">
          <button
            ref={ref}
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={handleToggle}
            disabled={disabled}
            className={`
             relative inline-flex items-center h-8 w-14 rounded-full p-1 transition-colors duration-200 ease-in-out
             ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
             ${error ? "ring-2 ring-red-500" : ""}
             ${
               checked
                 ? "bg-cyan-100 border-2 border-cyan-500"
                 : "bg-gray-200 border-2 border-gray-300"
             }
           `}
          >
            {/* Círculo deslizante */}
            <span
              className={`
               inline-block h-5 w-5 rounded-full shadow-md transition-all duration-200 ease-in-out
               ${
                 checked
                   ? "translate-x-6 bg-cyan-500"
                   : "translate-x-0 bg-gray-400"
               }
             `}
            />
          </button>

          {/* Etiqueta del estado actual */}
          <span className="text-sm font-medium text-gray-700">
            {checked ? activeLabel : inactiveLabel}
          </span>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Toggle.displayName = "Toggle";
