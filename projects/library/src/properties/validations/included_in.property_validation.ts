import { IPropertyValidation } from 'clerk';

function IncludedIn(array : any[]) : IPropertyValidation  {
  return { 
    name : 'Value included in ' + array.map(v => '"' + String(v) + '"').join(' , '),
    validate(value) {
      return array.includes(value) ? true : new Error('Wrong value to property, property only accepts some values')
    }
  }
};

export default IncludedIn;