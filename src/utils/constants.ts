export const API_AUTH_URL = "https://dev.apinetbo.bekindnetwork.com/api";
export const API_ACTIONS_URL = "https://dev.api.bekindnetwork.com/api/v1";

export const TOKEN_KEY = "token";

export const DEFAULT_PAGE_SIZE = 10;

export const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  CREATE_ACTION: "/actions/create",
} as const;

export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg"];
