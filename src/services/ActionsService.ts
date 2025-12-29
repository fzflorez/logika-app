import { actionsApi } from "./api";
import type { ActionsListResponse, CreateActionResponse } from "../types";
import { DEFAULT_PAGE_SIZE } from "../utils/constants";

export const actionsService = {
  getActions: async (
    pageNumber: number = 1,
    pageSize: number = DEFAULT_PAGE_SIZE,
    signal?: AbortSignal
  ): Promise<ActionsListResponse> => {
    const response = await actionsApi.get<ActionsListResponse>(
      "/actions/admin-list",
      {
        params: { pageNumber, pageSize },
        signal,
      }
    );
    return response.data;
  },

  createAction: async (data: {
    name: string;
    description: string;
    color: string;
    status: string;
    icon: File;
  }): Promise<CreateActionResponse> => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("color", data.color);
    formData.append("status", data.status);
    formData.append("icon", data.icon);

    const response = await actionsApi.post<CreateActionResponse>(
      "/actions/admin-add",
      formData
    );

    return response.data;
  },
};
