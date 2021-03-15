import { ApiRequest } from './ApiRequest';

export interface ApiResponse<Payload = any> {
  status : number;
  requestStartTime : number;
  requestEndTime : number;
  elapsedTime : number;
  headers : {
    [name : string] : string;
  };
  redirected : boolean;
  payload : Payload;
  request : ApiRequest;
}