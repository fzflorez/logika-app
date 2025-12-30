import { useState, useEffect, useCallback, useRef } from "react";
import type { Action } from "../types";
import { DEFAULT_PAGE_SIZE } from "../utils/constants";
import { actionsService } from "../services/ActionsService";

interface UseActionsReturn {
  actions: Action[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalElements: number;
    pageSize: number;
  };
  goToPage: (page: number) => void;
  refresh: () => void;
}

export function useActions(): UseActionsReturn {
  const [actions, setActions] = useState<Action[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchActions = useCallback(async (page: number) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setIsLoading(true);
    setError(null);

    try {
      const response = await actionsService.getActions(
        page,
        DEFAULT_PAGE_SIZE,
        abortControllerRef.current.signal
      );

      setActions(response.data.data);
      setTotalPages(response.data.totalPages);
      setTotalElements(response.data.totalElements);
      setCurrentPage(page);
    } catch (err) {
      if (err instanceof Error && err.name === "CanceledError") {
        return;
      }

      setError("Error al cargar las acciones. Por favor intenta nuevamente.");
      console.error("Error fetching actions:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActions(1);
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchActions]);

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages && page !== currentPage) {
        fetchActions(page);
      }
    },
    [fetchActions, totalPages, currentPage]
  );

  const refresh = useCallback(() => {
    fetchActions(currentPage);
  }, [fetchActions, currentPage]);

  return {
    actions,
    isLoading,
    error,
    pagination: {
      currentPage,
      totalPages,
      totalElements,
      pageSize: DEFAULT_PAGE_SIZE,
    },
    goToPage,
    refresh,
  };
}
