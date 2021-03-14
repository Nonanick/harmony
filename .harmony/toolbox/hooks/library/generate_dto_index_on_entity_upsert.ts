import ProjectRoot from '../../../project.root';
import { ProjectHook } from '../project.hook';
import path from 'path';

const DTOsFolder = path.join(ProjectRoot, 'projects','library','src','entities','dtos');

const GenerateDTOIndexOnEntityUpsertOrDelete : ProjectHook = {
  name : 'Generate DTO index on entity update/insert/delete',
  event : ["add","change", "unlink"],
  pattern: [/dtos\/.*\.dto\.ts$/],
  async hook(event, paths, wacther) {

  }
}

export default GenerateDTOIndexOnEntityUpsertOrDelete;