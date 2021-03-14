import { IPropertyValidation } from 'clerk';

function MatchPattern(patterns: RegExp[], mustMatchAllPatterns: boolean = false): IPropertyValidation {

  return {
    name: 'Must match pattern ' + patterns.map(r => '[' + r.source + ']').join(mustMatchAllPatterns ? ' AND ' : ' OR '),
    validate(value) {
      let matched = 0;

      patterns.forEach(p => {
        if (String(value).match(p)) matched++;
      });

      return mustMatchAllPatterns ?
        (matched === patterns.length ? true : new Error("Failed to match all patterns that were given!"))
        : (matched > 0 ? true : new Error("Failed to match at least on pattern!"));
    }
  }
}

export default MatchPattern;