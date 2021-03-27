import { HarmonyScript } from '../../../../.harmony';
import { RollupBundlerFilter } from '../../../../.harmony/toolbox/rollup_bundler.filter';
export const DevRunWebApp : HarmonyScript = {
  title : 'Run WebApp [Development]',
  name : 'dev',
  async run({ manager }) {

    await manager.spawnChildProcess({
      title : 'WebApp Rollup',
      name : 'webapp-rollup',
      launch : 'pnpx rollup -c -w',
      out : {
        pipeTo : process.stdout,
        filter : RollupBundlerFilter

      }, 
      err : {
        pipeTo : process.stdout,
        filter : RollupBundlerFilter
      }
    });

    await manager.spawnChildProcess({
      title : 'WebApp HTTP Server',
      name : 'webapp-server',
      launch : 'pnpx sirv ./public'
    });

  }
}