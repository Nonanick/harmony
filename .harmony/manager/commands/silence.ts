import { ManagerCommandListener } from './ManagerCommandListener';

export const SilenceOutputFromProject : ManagerCommandListener = {
  name : 'Silence output from project',
  command : /silence (?<project_name>\w*?)\s?(?<when_matches>.*?)?/,
  async run(args : any) {
    // Locate project outputs

    // If 'when macthes' is specified create a filter for the output

    // Else silence everything from that output
    
  }
}