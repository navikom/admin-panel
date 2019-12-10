function isDate(_date: string){
  const _regExp  = new RegExp('^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$');
  return _regExp.test(_date);
}

export default function convertDate(object: any) {
  Object.keys(object).forEach((key) => {
    if(object[key] && typeof object[key] === 'object') {
      convertDate(object[key]);
    } else {
      if(isDate(object[key])) {
        object[key] = new Date(object[key]);
      }
    }
  });
}

export function dateToString(date?: Date) {
  date = date || new Date();
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');

  return month + '/' + day + '/' + year;
}
