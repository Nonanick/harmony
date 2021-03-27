import { TypescriptCompilerOutFilter } from '../../../../.harmony/toolbox/typescript_compiler.filter';
import { HarmonyScript } from '@harmony';
import path from 'path';

export const DevServerScript: HarmonyScript = {
  name: 'dev',
  title: 'Server Worker [Development]',
  run: async ({ manager, root, args }) => {

    let compiler = await manager.spawnChildProcess({
      name: 'server-compiler',
      title: 'Server compiler',
      launch: 'tsc -w',
      out: {
        pipeTo: process.stdout,
        filter: TypescriptCompilerOutFilter
      }
    });

    // Restart worker when compiler output its "Im done" message
    compiler.stdout?.on("data", (data) => {
      if (String(data).match(/Found 0 errors\. Watching for file changes\./)) {
        manager.spawnWorker({
          name: 'server-worker',
          title: 'Server Worker',
          path: path.join(root, 'dist', 'server.boot.esm.js'),
          args
        })
      }
    });


  }
}