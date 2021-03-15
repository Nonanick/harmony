import { ApiMethod } from './ApiMethod';

export interface ApiRequest {
  method : ApiMethod;
  url : string;
  headers?: { [headerName : string] : string; };
  body? : { [propertyName : string] : any; };
  timeout? : number;
  sendCookies? : boolean;
}