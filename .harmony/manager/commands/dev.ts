import { ManagerCommandListener } from './ManagerCommandListener';

export const StartDevelopmentEnvironment : ManagerCommandListener = {
  name : 'Start project in development environment',
  command : /dev(\s(?<project_name>\w*?))?/,
  async run(args : any) {
    console.log('Will now run in dev mode ', args);
    // Locate targeted project(s)
    
    // Check for harmony 'dev' script and run it

    // Check for package 'dev' script

  }
  
}