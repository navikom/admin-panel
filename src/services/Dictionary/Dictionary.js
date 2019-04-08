import {settings} from './settings';

class DictionaryService {
  constructor(locale) {
    this.data = settings[locale];
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

export const Dictionary = new DictionaryService("en");