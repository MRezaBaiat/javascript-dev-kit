import _ from 'lodash';
import GeneralUtils from '../utils/GeneralUtils';

export default () => {
  if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function (str, replacement, ignore?) {
      // If a regex pattern
      return this.replace(new RegExp(str.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, '\\$&'), (ignore ? 'gi' : 'g')), (typeof (replacement) === 'string') ? replacement.replace(/\$/g, '$$$$') : replacement);
      /* if (
        Object.prototype.toString.call(str).toLowerCase() === '[object regexp]'
      ) {
        return this.replace(str, replacement);
      }

      // If a string
      return this.replace(new RegExp(str, 'g'), replacement); */
    };
  }
  if (!String.prototype.replaceAt) {
    String.prototype.replaceAt = function (index, replacement) {
      return (
        this.substr(0, index) +
        replacement +
        this.substr(index + replacement.length)
      );
    };
  }
  if (!String.prototype.replaceWithCondition) {
    String.prototype.replaceWithCondition = function (fnc) {
      let str = this as string;
      for (let i = 0; i < this.length; i++) {
        const replacement = fnc(str.charAt(i), i, str);
        if (!GeneralUtils.isVoid(replacement) && typeof replacement === 'string') {
          str = this.replaceAt(i, replacement);
        }
      }
      return str;
    };
  }
  if (!String.prototype.truncate) {
    String.prototype.truncate = function (atLength, replacement = '...') {
      return _.truncate(this as string, {
        length: atLength + replacement.length,
        omission: replacement
      });
    };
  }
};
