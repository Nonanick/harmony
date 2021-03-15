import { ApiPendingRequest } from './ApiPendingRequest';
import { ApiRequest } from './ApiRequest';
import { ApiRequestProxy } from './proxy/ApiRequestProxy';
import { ApiResponseProxy } from './proxy/ApiResponseProxy';

export interface ApiBridge {
  request<Payload = any>(request: ApiRequest): ApiPendingRequest<Payload>;
  clone(): ApiBridge;
  addRequestProxy(proxy: ApiRequestProxy): void;
  removeRequestProxy(proxy : ApiRequestProxy) : void;
  addResponseProxy(proxy: ApiResponseProxy): void;
  removeResponseProxy(proxy : ApiResponseProxy) : void;
}