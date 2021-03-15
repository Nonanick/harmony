import { ApiRequest } from './ApiRequest';
import { ApiResponse } from './ApiResponse';

export interface ApiPendingRequest<T = any> extends Promise<ApiResponse<T>> {
  abort() : void;
  elapsedTime() : number;
  startTime : number;
  request : ApiRequest;
}