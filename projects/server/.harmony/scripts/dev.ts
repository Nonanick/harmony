import { HarmonyScript } from '@harmony';
import path from 'path';

export const DevServerScript: HarmonyScript = {
  name: 'server-worker',
  title: 'Server Worker',
  run: ({ manager, root, args }) => {
    manager.spawnWorker({
      name : 'server',
      title : 'Server Worker',
      path : path.join(root, 'dist','server.boot.esm.js'),
      args
    })
  }
}