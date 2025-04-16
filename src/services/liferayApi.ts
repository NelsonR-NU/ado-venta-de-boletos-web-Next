import { createApiClient } from "./index";
import { config } from "@/config";

export const liferayApi = createApiClient({
  baseURL: config.liferay.baseURL,
  headers: {
    Authorization: "Basic " + btoa(`${config.liferay.username}:${config.liferay.password}`),
  },
});

export const setAuthToken = (token: string): void => {
  liferayApi.setAuthToken(token);
};

export const removeAuthToken = (): void => {
  liferayApi.removeAuthToken();
};
