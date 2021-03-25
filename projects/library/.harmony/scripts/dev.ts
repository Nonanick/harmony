import { HarmonyScript } from '@harmony';

export const CompileLibraryScript: HarmonyScript = {
  title: 'Library Compilation [Development]',
  name: 'dev',
  run({ manager }) {
    manager.spawnChildProcess({
      title: 'Library project typescript compiler',
      name: 'library-compiler',
      launch: 'tsc -w',
    });
  }
}