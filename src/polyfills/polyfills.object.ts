import _ from 'lodash';

export default () => {
  if (!Object.deepKeyValues) {
    Object.deepKeyValues = (object, prefix = '') => {
      const keyVals: { [key: string]: any }[] = [];
      Object.keys(object).forEach((key) => {
        keyVals.push({
          [`${prefix ? prefix + '.' + key : key}`]: object[key]
        });
        if (typeof object[key] === 'object') {
          const arr = Object.deepKeyValues(
            object[key],
            prefix ? prefix + '.' + key : key
          );
          arr.length !== 0 && keyVals.push(...arr);
        }
      });
      return keyVals;
    };
  }
  if (!Object.deepValue) {
    Object.deepValue = function (object, keyPath) {
      if (!object) {
        return undefined;
      }
      return _.get(object, keyPath);
      // return keyPath.split('.').reduce((o, i) => o[i], object);
    };
  }
  if (!Object.isEmpty) {
    Object.isEmpty = function (object) {
      return _.isEmpty(object);
    };
  }
  if (!Object.clone) {
    Object.clone = function (object, customizer) {
      return customizer ? _.cloneDeepWith(customizer) : _.cloneDeep(object);
    };
  }
  if (!Object.assignMerge) {
    Object.assignMerge = function (target, source) {
      return _.merge(target, source);
    };
  }
  if (!Object.setDeepValue) {
    Object.setDeepValue = function (object, keyPath, value) {
      return _.set(object, keyPath, value);
    };
  }
  if (!Object.updateDeepValue) {
    Object.updateDeepValue = function (object, keyPath, updater) {
      return _.update(object, keyPath, updater);
    };
  }
};
