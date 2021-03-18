import { Server } from '../../../scripts/run-dev/projects/run.server';
import { ProjectHook } from '../project.hook';

export const RestartServerOnDistFolderChanges: ProjectHook = {
  name: 'Restart Server on file changes',
  event: "all",
  pattern: [/dist\/.*\.(js|json|env)$/],
  debounce: 5000,
  async hook({ isInitial: initial }) {
    if (!initial) {
      await Server.RestartWorker();
    }
  }
}