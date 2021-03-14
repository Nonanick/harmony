import { IProperty } from 'clerk';
import kuuid from 'kuuid';

export const SortableUUID : IProperty = {
  name : '_id',
  type : String,
  default : () => kuuid.id(),
  unique : true,
  isDescriptive : false,
  isIdentifier : true,
  private : false,
  required : true,
}