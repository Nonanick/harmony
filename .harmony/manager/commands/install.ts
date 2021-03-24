import { ManagerCommandListener } from './ManagerCommandListener';

export const InstallProjectCommand : ManagerCommandListener = {
  name : 'Run project installation steps',
  command : /install(\s(?<project_name>\w*?))?/,
  async run(args : any) {
    console.log('Will now install ', args);
    // Locate targeted project(s)
    
    // Run pnpm install

    // Check for harmony 'install' script and run it

    // Check for harmony 'build' script and run it

  }
  
}