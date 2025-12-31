import {
  forwardRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { EyeOffIcon } from "../../assets/icons/eyeOffIcon";
import { EyeIcon } from "../../assets/icons/eyeIcon";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  showPasswordToggle?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      icon,
      showPasswordToggle = false,
      className = "",
      id,
      type,
      ...props
    },
    ref
  ) => {
    const inputId = id || props.name;
    const hasIcon = !!icon;
    const isPasswordType = type === "password";
    const [showPassword, setShowPassword] = useState(false);

    const inputType =
      isPasswordType && showPasswordToggle
        ? showPassword
          ? "text"
          : "password"
        : type;

    const hasPasswordToggle = isPasswordType && showPasswordToggle;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {hasIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            className={`
            w-full px-3 py-2 border rounded-md shadow-sm pr-3
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${error ? "border-red-500" : "border-gray-300"}
            ${hasIcon ? "pl-10" : "pl-3"}
            ${hasPasswordToggle ? "pr-10" : "pr-3"}
            ${className}

          `}
            {...props}
          />

          {hasPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              tabIndex={-1}
              aria-label={
                showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);
