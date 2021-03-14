import { ProjectHook } from '../project.hook';

const GenerateEntityVaultOnEntityUpsertOrDelete : ProjectHook = {
  name : 'Regenerate Entity index on entity update/insert/delete',
  event : ["add","change", "unlink"],
  pattern: [/\.entity\.ts$/],
  async hook(event, paths, wacther) {

  }
}

export default GenerateEntityVaultOnEntityUpsertOrDelete;