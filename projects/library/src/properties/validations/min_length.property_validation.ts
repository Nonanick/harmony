import { IPropertyValidation } from 'clerk';

function MinLength(min : number) : IPropertyValidation {
  return {
    name : 'Minimum length of ' + min,
    validate(value) {
      return Number(value) >= min ? true : new Error("Value must be greater than " + min)
    }
  }
}

export default MinLength;