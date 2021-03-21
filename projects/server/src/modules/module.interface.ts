import { Container, Controller } from 'maestro';

export interface Module {
  readonly name : string;
  readonly enabled : boolean;
  readonly api : (Controller | Container)[];
  [property : string] : any;
}