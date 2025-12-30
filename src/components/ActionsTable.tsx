import { useState } from "react";
import type { Action } from "../types";
import { Spinner } from "./ui/Spinner";
import { Pagination } from "./Pagination";
import { Alert } from "./ui/Alert";
import { formatDate, truncate } from "../utils/formatters";
import { Button } from "./ui/Button";

interface ActionsTableProps {
  actions: Action[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalElements: number;
  };
  onPageChange: (page: number) => void;
  onRetry: () => void;
}

export function ActionsTable({
  actions,
  isLoading,
  error,
  pagination,
  onPageChange,
  onRetry,
}: ActionsTableProps) {
  // Loading state
  if (isLoading && actions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
        <div className="flex flex-col items-center justify-center">
          <Spinner size="lg" />
          <p className="mt-4 text-gray-500">Cargando acciones...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
        <div className="flex flex-col items-center justify-center max-w-md mx-auto">
          <Alert type="error" message={error} />
          <Button onClick={onRetry} variant="primary" className="mt-4">
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  // Empty state
  if (actions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <p className="text-gray-500">No hay acciones disponibles</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto relative">
        {/*Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
            <Spinner size="lg" />
          </div>
        )}

        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Acción
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Descripción
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Color
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Fecha Creación
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {actions.map((action) => (
              <ActionTableRow key={action.id} action={action} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer with pagination */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          Mostrando <span className="font-medium">{actions.length}</span> de{" "}
          <span className="font-medium">{pagination.totalElements}</span>{" "}
          acciones
        </p>
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={onPageChange}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}

function ActionTableRow({ action }: { action: Action }) {
  const [imageError, setImageError] = useState(false);

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
            {!imageError ? (
              <img
                src={action.icon}
                alt={action.name}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <span className="text-xs">📷</span>
              </div>
            )}
          </div>
          <div>
            <p className="font-medium text-gray-900">
              {truncate(action.name, 25)}
            </p>
            <p className="text-xs text-gray-400">
              ID: {action.id.slice(0, 8)}...
            </p>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <p className="text-sm text-gray-600 max-w-xs">
          {truncate(action.description, 60)}
        </p>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full border border-gray-200"
            style={{ backgroundColor: action.color }}
          />
          <span className="text-sm text-gray-500 font-mono">
            {action.color}
          </span>
        </div>
      </td>

      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
            action.status === 1
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {action.status === 1 ? "● Activo" : "○ Inactivo"}
        </span>
      </td>

      <td className="px-6 py-4">
        <span className="text-sm text-gray-500">
          {formatDate(action.createdAt)}
        </span>
      </td>
    </tr>
  );
}
