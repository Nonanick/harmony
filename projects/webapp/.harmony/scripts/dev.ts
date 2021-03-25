import { HarmonyScript } from '../../../../.harmony';

export const DevRunWebApp : HarmonyScript = {
  title : 'Run WebApp [Development]',
  name : 'dev',
  async run({ manager }) {

    await manager.spawnChildProcess({
      title : 'WebApp Rollup',
      name : 'webapp-rollup',
      launch : 'pnpx rollup -c -w'
    });

    await manager.spawnChildProcess({
      title : 'WebApp HTTP Server',
      name : 'webapp-server',
      launch : 'pnpx sirv ./public'
    });

  }
}