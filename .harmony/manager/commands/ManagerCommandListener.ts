export interface ManagerCommandListener {
  name: string;
  command: string | RegExp | (string | RegExp)[];
  run: Function;
}