import type { WatcherHook } from '@harmony';
import { promises as fs } from 'fs';
import path from 'path';
import glob from 'glob';
import chalk from 'chalk';

const LookForVaribaleIdentifiers = ['Route', 'AppRoute'];

// Search for all Identifiers that are routes
const SearchForAllRoutes = new RegExp(
  '(const|let)\\s*?([A-z_$#]{1}[A-z_$#0-9]*)\\s*?:\\s*?('
  + LookForVaribaleIdentifiers.join('|')
  + ')\\s*?=', 'mg'
);

const RetrieveIdentifier = new RegExp(
  '(const|let)\\s*?(?<identifier>[A-z_$#]{1}[A-z_$#0-9]*)'
);

// Searchs for export (const|let) VariableName
const SearchForExportedVariable = new RegExp(
  'export\\s+(const|let)\\s*?([A-z_$#]{1}[A-z_$#0-9]*)', 'g'
);

// Searchs for export { Identifier, ...};
const SearchForExportedIdentifiers = new RegExp(
  'export\\s+\\{\\s*?(?<identifiers>([A-z_$#]{1}[A-z_$#0-9]*,?\\s*?)*)\\s*?\\}', 'gm'
);

const RetrieveExportedIdentifiers = new RegExp(
  'export\\s+\\{\\s*?(?<identifiers>([A-z_$#]{1}[A-z_$#0-9]*,?\\s*?)*)\\s*?\\}'
);

const RetrieveDefaultExport = new RegExp(
  'export\\s+default\\s+(?<identifier>[A-z_$#]{1}[A-z_$#0-9]*)'
);

export const GenerateWebappRoutesArray: WatcherHook = {
  name: 'Generate WebApp Routes',
  event: 'all',
  pattern: [/src\/routes\/.*\.route\.ts$/],
  mustMatchAllPatterns: true,
  async hook({ isInitial, root }) {
    let routesFolder = path.join(root, 'src', 'routes');

    glob('**/*.route.ts', {
      cwd: routesFolder,
      ignore: '**/index.ts'
    }, async (err, paths) => {
      if (err != null) {
        console.error('Failed to recreate routes barrel file!', err);
      }

      let routeExports: {
        [identifier: string]: {
          file: string;
          identifierName: string;
          isDefault?: boolean;
        }
      } = {};

      let mapRouteIdentifiers: {
        [identifier: string]: {
          file: string;
          identifierName: string;
          isDefault?: boolean;
        }
      } = {};
      for (let filepath of paths) {
        let fileContents = await fs.readFile(
          path.join(routesFolder, filepath),
          'utf-8'
        );

        // Use identifier matcher
        let identifierMatches = fileContents.match(SearchForAllRoutes);
        for (let matched of identifierMatches ?? []) {
          let identifier = matched.match(RetrieveIdentifier)!.groups!.identifier;
          mapRouteIdentifiers[identifier + '@' + filepath] = {
            file: filepath,
            identifierName: identifier
          };
        }

        let exportVariableMatches = fileContents.match(SearchForExportedVariable);
        for (let matched of exportVariableMatches ?? []) {
          let retrieveIdentifier = matched.match(RetrieveIdentifier)!.groups!.identifier;
          if (mapRouteIdentifiers[retrieveIdentifier + '@' + filepath] != null) {
            routeExports[retrieveIdentifier + '@' + filepath] = mapRouteIdentifiers[retrieveIdentifier + '@' + filepath];
          }
        }

        let exportIdentifiersMatches = fileContents.match(SearchForExportedIdentifiers);
        for (let matched of exportIdentifiersMatches ?? []) {
          let retrieveIdentifiers = matched.match(RetrieveExportedIdentifiers)!.groups!.identifiers;
          retrieveIdentifiers.split(',').map(i => i.trim()).forEach(identifier => {
            if (mapRouteIdentifiers[identifier + '@' + filepath] != null) {
              routeExports[identifier + '@' + filepath] = mapRouteIdentifiers[identifier + '@' + filepath];
            }
          });
        }

        let defaultExport = fileContents.match(RetrieveDefaultExport);
        if (defaultExport != null) {
          let identifier = defaultExport.groups!.identifier;
          if (mapRouteIdentifiers[identifier + '@' + filepath] != null) {
            routeExports[identifier + '@' + filepath] = {
              ...mapRouteIdentifiers[identifier + '@' + filepath],
              isDefault: true
            };
          }
        }
      }

      let routesFileContent = '// # - Routes barrel !\n\n';
      if (Object.values(routeExports).length === 0) {
        routesFileContent += 'export {}; // Prevent errors in "isolatedModules" compile flag';
      }
      for (let exportClause of Object.values(routeExports)) {
        let relativePath = './' + exportClause.file.replaceAll(path.sep, path.posix.sep).replace(/.ts$/g, '');
        routesFileContent += `export { ${(exportClause.isDefault ?? false) ? 'default as ' : ''}${exportClause.identifierName} } from '${relativePath}';\n`
      }
      if (!isInitial) {
        console.log(
          `📁 ${chalk.bold('[WebApp - Generate Routes]')} Done scanning routes folder, found routes:\n` +
          Object.values(routeExports).map(
            r => {
              let fileName = path.basename(r.file);
              return ` ▫️ ${r.identifierName} @${chalk.dim(fileName)};`;
            }
          ).join('\n')
        );
      }
      fs.writeFile(
        path.join(routesFolder, 'routes.ts'),
        routesFileContent
      );
    });

  }
}