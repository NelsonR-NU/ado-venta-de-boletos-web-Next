import { createApiClient } from "./index";
import { config } from "@/config";

export const api = createApiClient({
  baseURL: config.api.baseURL,
  timeout: config.api.timeout,
});

export const setAuthToken = (token: string): void => {
  api.setAuthToken(token);
};

export const removeAuthToken = (): void => {
  api.removeAuthToken();
};
