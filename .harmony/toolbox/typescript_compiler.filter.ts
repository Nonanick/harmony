import chalk from 'chalk';

const TSCErrorMatcher = /(?<file_name>.*?)\((?<line>[0-9]*),(?<column>[0-9]*)\): error\s(?<code>\w*): (?<message>.*)/;

export const TypescriptCompilerOutFilter = (data: any) => {
  if (String(data).match(/Found 0 errors\. Watching for file changes\./)) {
    return '✅ Typescript compilation completed without errors!\n';
  }

  let errorMatch = data.match(TSCErrorMatcher);
  if (errorMatch) {
    return chalk.bold(`🚨 ${chalk.bgRed.white('Typescript Error')} [${errorMatch.groups!.code }]`)
      + '@' + chalk.bold(errorMatch.groups!.file_name) + ':' + errorMatch.groups!.line + ',' + errorMatch.groups!.column + '\n'
      + chalk.red.bold('='.repeat(process.stdout.columns)) + '\n'
      + errorMatch.groups!.message.replace(/\.\s/g,'.\n') + '\n'
      + chalk.red.bold('='.repeat(process.stdout.columns)) + '\n';
  }

  return false as false;
};
