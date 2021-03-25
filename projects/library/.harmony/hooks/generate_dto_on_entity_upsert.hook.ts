import type { ProjectHook } from '@harmony';
import { IEntity } from 'clerk';
import path from 'path';
import { isEntityDefinition } from './generate_index_on_entity_upsert.hook';

export const GenerateDTOOnEntityUpsert: ProjectHook = {
  name: "Generate DTO on entity Update/Insert",
  event: ["add", "change"],
  pattern: [/\.entity\.js$/],
  async hook({ filepath, project_root }) {
    const DTOsFolder = path.join(project_root, 'src', 'entities', 'dtos');
    import(
      filepath.replace(/\.js$/,'')
    ).then(module => {
      let entity: IEntity | undefined = undefined;
      for (let identifier in module) {
        if (isEntityDefinition(module[identifier])) {
          entity = module[identifier];
        }
      }

      if (entity == null) {
        return new Error('No entity found!');
      }
     

    }).catch(err => {
      console.error('Failed to load entity, could not generate DTO', err);
    });

  }
};