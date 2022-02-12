import _ from 'lodash';

const isBase64 = (text : string) : boolean => {
  return !!(text && text.match(/^data:/));
};

const commaSeparate = (number) => {
  const parts = number.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

const numbersToPersian = (str: string) => {
  if (!str) {
    return str;
  }
  str = String(str);
  let newValue = '';
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    if (ch >= 48 && ch <= 57) {
      const newChar = ch + 1584;
      newValue = newValue + String.fromCharCode(newChar);
    } else {
      newValue = newValue + String.fromCharCode(ch);
    }
  }
  return newValue;
};

const numbersToEnglish = (str: string) => {
  if (!str) {
    return str;
  }
  str = String(str);
  let e = '۰'.charCodeAt(0);
  // @ts-ignore
  str = str.replace(/[۰-۹]/g, (t) => t.charCodeAt(0) - e);

  e = '٠'.charCodeAt(0);
  // @ts-ignore
  str = str.replace(/[٠-٩]/g, (t) => t.charCodeAt(0) - e);
  return str;
};

const escapeHTML = (str: string | undefined) => {
  if (!str) {
    return str;
  }
  return _.escape(str);
};

const unescapeHTML = (str: string | undefined) => {
  if (!str) {
    return str;
  }
  return _.unescape(str);
};

const escapeRegex = (str: string | undefined) => {
  if (!str) {
    return str;
  }
  return _.escapeRegExp(str);
};

export default {
  numbersToPersian,
  numbersToEnglish,
  escapeHTML,
  unescapeHTML,
  escapeRegex,
  commaSeparate,
  isBase64
};
