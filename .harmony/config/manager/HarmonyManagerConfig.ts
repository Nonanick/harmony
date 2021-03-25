export interface HarmonyManagerConfig {
  project_root : string;
  projects_location : string;
  onInit? : { 
    displayCLIHeader? : boolean;
    displayFoundProjects? : boolean;
  },
}