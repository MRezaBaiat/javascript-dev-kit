"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let instance;
const getInstance = () => {
    if (instance) {
        return instance;
    }
    const { PhoneNumber, PhoneNumberUtil } = require('google-libphonenumber');
    instance = PhoneNumberUtil.getInstance();
    return instance;
};
const isValidMobile = (mobile) => {
    try {
        if (!mobile.startsWith('+')) {
            mobile = '+' + mobile;
        }
        const phone = getInstance().parse(mobile);
        return phone && getInstance().isValidNumber(phone);
    }
    catch (err) {
        return false;
    }
    /* const m = parsePhoneNumber(mobile);
      return m && m.isValid(); */
};
const initMobileNumber = (mobile) => {
    if (!mobile || !isValidMobile(mobile)) {
        return undefined;
    }
    if (!mobile.startsWith('+')) {
        mobile = '+' + mobile;
    }
    const info = extractMobileInfo(mobile);
    return `+${info.getCountryCode()}-${info.getNationalNumber()}`;
};
const extractMobileInfo = (mobile) => {
    return getInstance().parse(mobile);
};
exports.default = {
    isValidMobile,
    initMobileNumber
};
