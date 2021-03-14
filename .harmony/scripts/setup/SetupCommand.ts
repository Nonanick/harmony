export interface SetupCommand {
  name : string;
  root : string;
  execute_on_shell? : string;
  run? : () => {
    
  }
}