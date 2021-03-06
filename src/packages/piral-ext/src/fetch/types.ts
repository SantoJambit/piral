export interface FetchOptions {
  /**
   * Sets the HTTP method.
   * @default 'get'
   */
  method?: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'head';
  /**
   * Sets the body of the request.
   * @default null
   */
  body?: string | Blob | FormData | Array<any> | {} | number;
  /**
   * Sets the headers of the request.
   * @default {}
   */
  headers?: Record<string, string>;
  /**
   * Sets the caching mode of the request.
   */
  cache?: RequestCache;
  /**
   * Sets the CORS mode of the request.
   */
  mode?: RequestMode;
  /**
   * Sets the result mode of the request.
   * @default 'auto'
   */
  result?: 'auto' | 'json' | 'text';
}

export interface FetchResponse<T> {
  /**
   * The body of the response.
   */
  body: T;
  /**
   * The status code of the response.
   */
  code: number;
  /**
   * The status text of the response.
   */
  text: string;
}

export interface FetchConfig {
  /**
   * Sets the default request init settings.
   * @default {}
   */
  default?: RequestInit;
  /**
   * Sets the base URL to use for requests.
   * @default location.origin
   */
  base?: string;
}

export interface PiralFetchApiFetch {
  <T = any>(url: string, options?: FetchOptions): Promise<FetchResponse<T>>;
}

export interface PiralFetchApi {
  /**
   * Performs an HTTP fetch operation against the given URL.
   * @param url The target of the fetch.
   * @param options The options to be used.
   */
  fetch: PiralFetchApiFetch;
}
