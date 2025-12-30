import { forwardRef, type InputHTMLAttributes } from "react";

interface ColorPickerProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
}

export const ColorPicker = forwardRef<HTMLInputElement, ColorPickerProps>(
  ({ label, error, className = "", value, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="flex items-center gap-3">
          <input
            ref={ref}
            type="color"
            value={value || "#3B82F6"}
            className={`
             w-10 h-10 rounded-md cursor-pointer border-2
             ${error ? "border-red-500" : "border-gray-300"}
             ${className}
           `}
            {...props}
          />
          <div className="flex-1">
            <input
              type="text"
              value={value || ""}
              onChange={props.onChange}
              placeholder="Registra color codigo HEX"
              className={`
               w-full px-3 py-2 border rounded-md shadow-sm
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
               ${error ? "border-red-500" : "border-gray-300"}
             `}
              maxLength={7}
            />
          </div>
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

ColorPicker.displayName = "ColorPicker";
