import { WorkspaceRoot } from '../../workspace.root';
import { HarmonyManagerConfig } from './HarmonyManagerConfig';
import path from 'path';

export const DefaultManagerConfig: HarmonyManagerConfig = {
  project_root: WorkspaceRoot,
  projects_location: path.join(WorkspaceRoot, 'projects'),
  onInit: {
    displayCLIHeader: true,
    displayFoundProjects: true,
  }
};