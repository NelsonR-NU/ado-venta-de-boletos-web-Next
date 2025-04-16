import { ApiClientOptions, RequestOptions } from "@/types/services";

class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private defaultTimeout: number;

  constructor(options: ApiClientOptions) {
    this.baseURL = options.baseURL;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      ...options.headers,
    };
    this.defaultTimeout = options.timeout || 30000;
  }

  private async timeoutPromise(ms: number): Promise<never> {
    return new Promise((_, reject) =>
      setTimeout(() => reject(new ApiError("Request timeout", 408)), ms)
    );
  }

  private async fetchWithTimeout(
    resource: string,
    options: RequestInit,
    timeout: number
  ): Promise<Response> {
    return Promise.race([fetch(resource, options), this.timeoutPromise(timeout)]);
  }

  private getFullUrl(endpoint: string): string {
    return endpoint.startsWith("http")
      ? endpoint
      : `${this.baseURL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  }

  public async request<T>(endpoint: string, options: RequestOptions): Promise<T> {
    const url = this.getFullUrl(endpoint);
    const timeout = options.timeout || this.defaultTimeout;

    const headers = {
      ...this.defaultHeaders,
      ...options.headers,
    };

    const config: RequestInit = {
      method: options.method,
      headers,
      credentials: "include",
    };

    if (options.body && options.method !== "GET" && options.method !== "HEAD") {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await this.fetchWithTimeout(url, config, timeout);

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_) {
          errorData = { message: response.statusText };
        }

        throw new ApiError(
          errorData.message || `Request failed with status ${response.status}`,
          response.status,
          errorData
        );
      }

      if (response.status === 204 || response.headers.get("content-length") === "0") {
        return {} as T;
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return (await response.json()) as T;
      }

      return (await response.text()) as unknown as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(error instanceof Error ? error.message : "Unknown error occurred", 0);
    }
  }

  public get<T>(
    endpoint: string,
    params?: Record<string, string>,
    options?: Omit<RequestOptions, "method" | "body">
  ): Promise<T> {
    const url = params ? `${endpoint}?${new URLSearchParams(params).toString()}` : endpoint;

    return this.request<T>(url, {
      method: "GET",
      ...options,
    });
  }

  public post<T>(
    endpoint: string,
    data?: unknown,
    options?: Omit<RequestOptions, "method">
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data,
      ...options,
    });
  }

  public put<T>(
    endpoint: string,
    data?: unknown,
    options?: Omit<RequestOptions, "method">
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data,
      ...options,
    });
  }

  public patch<T>(
    endpoint: string,
    data?: unknown,
    options?: Omit<RequestOptions, "method">
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: data,
      ...options,
    });
  }

  public delete<T>(endpoint: string, options?: Omit<RequestOptions, "method">): Promise<T> {
    return this.request<T>(endpoint, {
      method: "DELETE",
      ...options,
    });
  }

  // Method to add or update default headers
  public setHeaders(headers: Record<string, string>): void {
    this.defaultHeaders = {
      ...this.defaultHeaders,
      ...headers,
    };
  }

  // Method to set authorization header
  public setAuthToken(token: string): void {
    this.defaultHeaders.Authorization = `Bearer ${token}`;
  }

  // Method to remove authorization header
  public removeAuthToken(): void {
    delete this.defaultHeaders.Authorization;
  }
}

export const createApiClient = (options: ApiClientOptions): ApiClient => new ApiClient(options);

export { ApiClient, ApiError };
export type { ApiClientOptions, RequestOptions };
