import { promises as fs } from 'fs';
import path from 'path';
import { glob } from 'glob';
import type { ProjectHook } from '@harmony';

const GenerateDTOIndexOnEntityUpsertOrDelete: ProjectHook = {
  name: 'Generate DTO index on entity update/insert/delete',
  event: ["add", "change", "unlink"],
  pattern: [/dtos\/.*\.dto\.ts$/],
  async hook({ project_root }) {
    const DTOsFolder = path.join(project_root, 'src', 'entities', 'dtos');
    glob('**/*.dto.ts', {
      cwd: DTOsFolder,
      ignore: '**/dto.index.ts'
    }, async (err, paths) => {
      
      if(err) {
        console.error('Failed to find DTOS, could not generate index');
      }

      let outputIndexFile = path.join(DTOsFolder, 'dto.index.ts');
      let outputContent = '// # DTOs barrel file\n';
      for (let filepath of paths) {
        let DTOName = filepath.replace(/\.dto\.ts/, '').split('.').map(p => p.charAt(0).toUpperCase() + p.substr(1)).join('');
        outputContent += `export { ${DTOName}DTO } from './${filepath.replace(/\.ts$/,'')}';\n`;
      }

      fs.writeFile(outputIndexFile, outputContent);
    });
  }
}

export default GenerateDTOIndexOnEntityUpsertOrDelete;