import chalk from 'chalk';

const RollupPluginMatcher = /^\(!\)\sPlugin\s(?<plugin_name>\w*):\s(?<message>[\s\S]*)$/;

export const RollupBundlerFilter = (data: any) => {
  if (String(data).match(/^created\s(?<bundle_path>.*)\sin\s(?<elapsed_time>.*)/)) {
    return '✅ Rollup bundling completed without errors!\n';
  }

  let errorMatch = data.match(RollupPluginMatcher);
  if (errorMatch) {
    return chalk.bold(`🚨 ${chalk.bgRed.white('Rollup Error')} [${errorMatch.groups!.plugin_name }]\n`)
      + chalk.red.bold('='.repeat(process.stdout.columns)) + '\n'
      + errorMatch.groups!.message.replace(/\.\s/g,'.\n') + '\n'
      + chalk.red.bold('='.repeat(process.stdout.columns)) + '\n';
  }

  return 'b->' + String(data);
};
