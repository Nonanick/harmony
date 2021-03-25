import type { ProjectHook } from '@harmony';
import { promises as fs } from 'fs';
import path from 'path';
import glob from 'glob';
import { IEntity } from 'clerk';

export const GenerateLibraryEntitiesIndex: ProjectHook = {
  name: 'Generate Entities index file',
  event: 'all',
  pattern: [/dist\/entities\/definitions\/.*\.entity\.js$/],
  mustMatchAllPatterns: true,
  async hook({ project_root }) {
    const LibraryEntityDir = path.join(project_root, 'dist', 'entities', 'definitions');

    glob('**/*.entity.js', {
      cwd: LibraryEntityDir,
      ignore: '**/index.ts'
    }, async (err, paths) => {
      if (err != null) {
        console.error('Failed to recreate entities barrel file!', err);
      }
      let identifiers: {identifier : string; filepath : string}[] = [];

      for (let filepath of paths) {
        await import(
             path.join(LibraryEntityDir, filepath).replace(/\.js$/,'')
        ).then(m => {
          for (let identifier in m) {
            if (isEntityDefinition(m[identifier])) {
              identifiers.push({
                identifier,
                filepath
              });
            }
          }
        });
      }

      let entityIndexPath = path.join(project_root, 'src','entities','index.ts');
      let indexContent="// # Entities barrel auto generated file\n";
      for(let newImport of identifiers) {
        indexContent += `export { ${newImport.identifier} } from './definitions/${newImport.filepath.replace(/\.js$/,'')}';\n`; 
      }

      await fs.writeFile(entityIndexPath, indexContent);

    });

  }
}

export function isEntityDefinition(obj: any): obj is IEntity {
  return (
    typeof obj.name === "string"
    && typeof obj.properties === "object"
    && (typeof obj.source === "string" || obj.source === undefined)
    && (typeof obj.identifier === "object" || obj.identifier === undefined)
    && (typeof obj.proxy === "object" || obj.proxy === undefined)
    && (typeof obj.hooks === "object" || obj.hooks === undefined)
    && (typeof obj.procedures === "object" || obj.procedures === undefined)
    && (typeof obj.filters === "object" || obj.filters === undefined)
  )
}
