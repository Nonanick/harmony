import type { ApiBridge, ApiPendingRequest, ApiRequest, ApiRequestProxy, ApiResponse, ApiResponseProxy } from 'harmony-library';

export class Api implements ApiBridge {

  private _requestProxies: ApiRequestProxy[] = [];

  private _responseProxies: ApiResponseProxy[] = [];

  constructor(private serverURL?: string) {

  }

  get<Payload = any>(url: string, queryParams?: { [name: string]: string }, options?: Omit<ApiRequest, "method" | "url" | "body">): ApiPendingRequest<Payload> {

    if (queryParams != null) {
      let queryStr = Object.entries(queryParams).map(([key, value]) => {
        return `${encodeURI(key)}=${encodeURI(value)}`
      }).join('&');

      if (url.indexOf('?') >= 0) {
        url += '&' + queryStr;
      } else {
        url += '?' + queryStr;
      }
    }

    return this.request({
      ...options,
      method: 'GET',
      url
    });
  }

  post<Payload = any>(url: string, body?: any, options?: Omit<ApiRequest, "method" | "url" | "body">): ApiPendingRequest<Payload> {

    return this.request({
      ...options,
      method: 'POST',
      url: url,
      body
    });

  }

  put<Payload = any>(url: string, body?: any, options?: Omit<ApiRequest, "method" | "url" | "body">): ApiPendingRequest<Payload> {

    return this.request({
      ...options,
      method: 'PUT',
      url: url,
      body
    });

  }

  delete<Payload = any>(url: string, body?: any, options?: Omit<ApiRequest, "method" | "url" | "body">): ApiPendingRequest<Payload> {

    return this.request({
      ...options,
      method: 'DELETE',
      url: url,
      body
    });

  }

  patch<Payload = any>(url: string, body?: any, options?: Omit<ApiRequest, "method" | "url" | "body">): ApiPendingRequest<Payload> {

    return this.request({
      ...options,
      method: 'PATCH',
      url: url,
      body
    });

  }

  request<Payload = any>(request: ApiRequest): ApiPendingRequest<Payload> {
    let abortCtrl = new AbortController();
    let startTime = performance.now();

    let fetchResp = fetch(request.url, {
      body: JSON.stringify(request.body),
      headers: request.headers,
      credentials: request.sendCookies === true ? 'include' : 'omit',
      signal: abortCtrl.signal,
      method: request.method,
      // TODO check by itself if it should use CORS based on serverURL / window.location
    });

    let resolvedPromise = fetchResp.then(async response => {
      let apiResponse: ApiResponse = {
        elapsedTime: performance.now() - startTime,
        headers: response.headers as any,
        payload: response.json(),
        redirected: response.redirected,
        request,
        status: response.status,
        requestStartTime: startTime,
        requestEndTime: performance.now()
      };

      return apiResponse;
    });

    let pendingRequest: ApiPendingRequest = {
      then: resolvedPromise.then,
      catch: fetchResp.catch,
      finally: resolvedPromise.finally,
      [Symbol.toStringTag]: fetchResp[Symbol.toStringTag],
      elapsedTime() {
        return performance.now() - startTime;
      },
      request,
      startTime,
      abort: abortCtrl.abort
    }
    return pendingRequest;
  }

  clone(): ApiBridge {
    throw new Error('Method not implemented.');
  }

  addRequestProxy(proxy: ApiRequestProxy): void {
    if (!this._requestProxies.includes(proxy)) {
      this._requestProxies.push(proxy);
    }
  }

  removeRequestProxy(proxy: ApiRequestProxy): void {
    if (this._requestProxies.includes(proxy)) {
      this._requestProxies = this._requestProxies.filter(p => p != proxy);
    }
  }

  addResponseProxy(proxy: ApiResponseProxy): void {
    if (!this._responseProxies.includes(proxy)) {
      this._responseProxies.push(proxy);
    }
  }
  
  removeResponseProxy(proxy: ApiResponseProxy): void {
    if (this._responseProxies.includes(proxy)) {
      this._responseProxies = this._responseProxies.filter(p => p != proxy);
    }
  }

}