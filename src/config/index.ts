export const config = {
  api: {
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
    timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000,
  },
  auth: {
    baseURL: process.env.NEXT_PUBLIC_AWS_AUTH_API_BASE_URL || "",
    usuario: process.env.NEXT_PUBLIC_AWS_AUTH_API_USERNAME || "",
    password: process.env.NEXT_PUBLIC_AWS_AUTH_API_PASSWORD || "",
  },
  liferay: {
    username: process.env.NEXT_PUBLIC_LIFERAY_USERNAME ?? "",
    password: process.env.NEXT_PUBLIC_LIFERAY_PASSWORD ?? "",
    baseURL: process.env.NEXT_PUBLIC_LIFERAY_BASE_URL ?? "",
  },
};
