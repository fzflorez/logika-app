interface AlertProps {
  type: "error" | "success" | "warning" | "info";
  message: string;
  onClose?: () => void;
}

const typeClasses = {
  error: "bg-red-50 border-red-200 text-red-800",
  success: "bg-green-50 border-green-200 text-green-800",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
  info: "bg-blue-50 border-blue-200 text-blue-800",
};

export function Alert({ type, message, onClose }: AlertProps) {
  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-lg border ${typeClasses[type]}`}
      role="alert"
    >
      <p className="flex-1 text-sm text-center">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="shrink-0 hover:opacity-70 transition-opacity"
          aria-label="Cerrar"
        >
          ✕
        </button>
      )}
    </div>
  );
}
