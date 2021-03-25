import { ProjectHook } from '@harmony';

const GenerateEntityVaultOnEntityUpsertOrDelete : ProjectHook = {
  name : 'Regenerate Entity index on entity update/insert/delete',
  event : ["add","change", "unlink"],
  pattern: [/\.entity\.ts$/],
  async hook() {

  }
}

export default GenerateEntityVaultOnEntityUpsertOrDelete;