import { WatcherHook } from '../../../../.harmony/watcher/WatcherHook';

export const RestartServerOnDistFolderChanges: WatcherHook = {
  name: 'Restart Server on file changes',
  event: "all",
  pattern: [/dist\/.*\.(js|json|env)$/],
  debounce: 5000,
  async hook({ isInitial: initial, manager }) {
    if (!initial) {
      manager.runCommand('restart',{});
    }
  }
}