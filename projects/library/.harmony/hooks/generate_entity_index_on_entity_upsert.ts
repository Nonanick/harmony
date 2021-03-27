import { WatcherHook } from '@harmony';

const GenerateEntityVaultOnEntityUpsertOrDelete : WatcherHook = {
  name : 'Regenerate Entity index on entity update/insert/delete',
  event : ["add","change", "unlink"],
  pattern: [/\.entity\.ts$/],
  async hook() {

  }
}

export default GenerateEntityVaultOnEntityUpsertOrDelete;