import { IPropertyValidation } from 'clerk';

const NonEmptyString: IPropertyValidation = {
  name: 'Non-empty string',
  validate(value) {
    return (
      typeof value === "string"
      && value.length > 0
    ) ? true : new Error("Value must be an string and it must not be empty!");
  }
};

export default NonEmptyString;