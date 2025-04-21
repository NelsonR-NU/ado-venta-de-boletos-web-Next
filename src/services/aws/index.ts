import { ENDPOINTS } from "@/constants/endpoints";
import { createApiClient } from "../index";
import { config } from "@/config";

export const authApi = createApiClient({
  baseURL: config.auth.baseURL,
});

const signIn = async () => {
  try {
    const response = await authApi.post(ENDPOINTS.awsAuth.signIn, {
      body: {
        usuario: config.auth.usuario,
        password: config.auth.password,
      },
    });
    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

export { signIn };
