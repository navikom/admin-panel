import {settings} from './settings';

export class DictionaryService {
  constructor(locale) {
    this.data = settings[locale];

    this.reversed = {};
    for(let key in DictionaryService.keys) {
      this.reversed[DictionaryService.keys[key]] = key;
    }
  }

  defValue(value, values) {
    const key = this.reversed[value];
    return this.value(key, values);
  }

  value(key, values) {
    let data = this.data[key];
    if(values) {
      if(Array.isArray(values)) {
        values.forEach((e, i) => {
          data = data.replace(`%${i}`, e);
        })
      } else {
        data = data.replace('$', values);
      }
    }
    return data ? data : key;
  }

  exists(key) {
    return this.data[key] !== undefined;
  }
}
DictionaryService.keys = require('../i18n/en.json');

export const Dictionary = new DictionaryService("en");
