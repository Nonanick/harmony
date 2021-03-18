import * as ts from 'typescript';
import { promises as fs } from 'fs';
import path from 'path';
import glob from 'glob';
import { ProjectHook } from '../project.hook';
import ProjectRoot from '../../../project.root';

const WebAppRoutesDir = path.join(ProjectRoot, 'projects', 'webapp', 'src', 'routes');

export const GenerateWebappRoutesArray: ProjectHook = {
  name: 'Generate WebApp Routes',
  event: 'all',
  pattern: [/src\/routes\/.*\.route\.ts$/],
  mustMatchAllPatterns: true,
  async hook() {

    glob('**/*.route.ts', {
      cwd: WebAppRoutesDir,
      ignore: '**/index.ts'
    }, async (err, paths) => {
      if (err != null) {
        console.error('Failed to recretae routes index!', err);
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

      await Promise.all(
        paths
          .map(p => path.join(WebAppRoutesDir, p))
          .map(async fullPath => {
            let fileContent = await fs.readFile(fullPath, 'utf-8');
            let ast = ts.createSourceFile(fullPath, fileContent, ts.ScriptTarget.Latest);

            ast.forEachChild(node => {
              // Handle : 'export const'
              if (ts.isVariableStatement(node)) {
                for (let declaration of node.declarationList.declarations) {
                  if (
                    ts.isVariableDeclaration(declaration)
                    && ts.isTypeReferenceNode(declaration.type!)
                    && ts.isIdentifier(declaration.type!.typeName)
                    && declaration.type!.typeName.escapedText === "Route"
                  ) {
                    let exportToken = node.modifiers?.filter(m => ts.isToken(m));

                    if (
                      exportToken != null
                      && exportToken.length > 0
                      && ts.SyntaxKind.ExportKeyword === exportToken[0].kind
                    ) {
                      let identifierName = String((declaration.name as ts.Identifier).escapedText);
                      routeExports[`${identifierName}@${fullPath}`] = {
                        file: fullPath,
                        identifierName: identifierName,
                        isDefault: false
                      };
                    } else {
                      let identifierName = String((declaration.name as ts.Identifier).escapedText);
                      mapRouteIdentifiers[`${identifierName}@${fullPath}`] = {
                        file: fullPath,
                        identifierName: identifierName,
                        isDefault: false
                      };
                    }
                  }
                }
              }

              // Handle : 'export default' 
              if (ts.isExportAssignment(node)
                && ts.isIdentifier(node.expression)
                && mapRouteIdentifiers[`${node.expression.escapedText}@${fullPath}`] != null) {
                routeExports[`${node.expression.escapedText}@${fullPath}`] = {
                  ...mapRouteIdentifiers[`${node.expression.escapedText}@${fullPath}`],
                  isDefault: true,
                };
              }

              // Handle : 'export { NamedExports }'
              if (
                ts.isExportDeclaration(node)
                && ts.isNamedExports(node.exportClause!)
              ) {
                for (let exportedEl of node.exportClause!.elements) {
                  if (
                    mapRouteIdentifiers[`${(exportedEl.propertyName ?? exportedEl.name).escapedText}@${fullPath}`] != null
                  ) {
                    routeExports[`${exportedEl.name.escapedText}@${fullPath}`] = {
                      ...mapRouteIdentifiers[`${(exportedEl.propertyName ?? exportedEl.name).escapedText}@${fullPath}`],
                      identifierName: String(exportedEl.name.escapedText)
                    };
                  }
                }
              }

            });
            return;
          }));
      let routesFileContent = '// # - Routes barrel !\n\n';

      for (let exportClause of Object.values(routeExports)) {
        let relativePath = './' + exportClause.file.substr(WebAppRoutesDir.length + 1).replaceAll(path.sep, path.posix.sep).replace(/.ts$/g, '');
        routesFileContent += `export { ${(exportClause.isDefault ?? false) ? 'default as ' :  ''}${exportClause.identifierName} } from '${relativePath}';\n`
      }

      fs.writeFile(
        path.join(WebAppRoutesDir, 'routes.ts'),
        routesFileContent
      );
    });

  }
}