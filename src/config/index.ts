export const config = {
  api: {
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
    timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000,
  },
  liferay: {
    username: process.env.NEXT_PUBLIC_LIFERAY_USERNAME ?? "",
    password: process.env.NEXT_PUBLIC_LIFERAY_PASSWORD ?? "",
    baseURL:
      process.env.NEXT_PUBLIC_LIFERAY_BASE_URL ??
      "https://front-adoweb-dev.lfr.cloud/o/headless-delivery/v1.0/structured-contents",
  },
};
