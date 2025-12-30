import { type ButtonHTMLAttributes } from "react";
import { Spinner } from "./Spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "ghostGray";
  isLoading?: boolean;
  fullWidth?: boolean;
}

const variantClasses = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-[#1E1B4D] hover:bg-[#1E1B4D] text-white",
  ghost: "bg-transparent hover:bg-slate-100 text-[#1E1B4D] border-transparent",
  ghostGray:
    "bg-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors",
};

export function Button({
  children,
  variant = "primary",
  isLoading = false,
  fullWidth = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
       px-4 py-2 rounded-lg font-medium transition-colors
       disabled:opacity-50 disabled:cursor-not-allowed
       flex items-center justify-center gap-2 cursor-pointer
       ${variantClasses[variant]}
       ${fullWidth ? "w-full" : ""}
       ${className}
     `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Spinner size="sm" />}
      {children}
    </button>
  );
}
