import { Entity } from 'clerk';
import IncludedIn from '../../../properties/validations/included_in.property_validation';
import { SortableUUID } from '../../../properties/definitions/sortable_uuid.property';
import MinLength from '../../../properties/validations/min_length.property_validation';
import NonEmptyString from '../../../properties/validations/non_empty_string.property_validation';
import { UserType } from './user_type.enum';

const UserDefinition = Entity.define({
  name: 'user',
  identifier: SortableUUID,
  properties: {
    username: {
      type: String,
      required: true,
      isDescriptive: true,
      unique: true,
      validate: [NonEmptyString, MinLength(3)]
    },
    password: {
      type: String,
      private: true,
      required: true,
      validate: [NonEmptyString, MinLength(6)]
    },
    user_type: {
      type: String,
      private: true,
      required: true,
      default: UserType.NORMAL,
      validate: [
        IncludedIn([UserType.MASTER, UserType.NORMAL, UserType.SYS_ADMIN, UserType.SYS_DEVELOPER])
      ]
    }
  }
});

export default UserDefinition;