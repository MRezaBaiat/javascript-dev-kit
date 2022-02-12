
let instance;
const getInstance = () => {
  if (instance) {
    return instance;
  }
  const { PhoneNumber, PhoneNumberUtil } = require('google-libphonenumber');
  instance = PhoneNumberUtil.getInstance();
  return instance;
};

const isValidMobile = (mobile: string): boolean => {
  try {
    if (!mobile.startsWith('+')) {
      mobile = '+' + mobile;
    }
    const phone = getInstance().parse(mobile);
    return phone && getInstance().isValidNumber(phone);
  } catch (err) {
    return false;
  }
  /* const m = parsePhoneNumber(mobile);
    return m && m.isValid(); */
};

const initMobileNumber = (mobile: string): string | undefined => {
  if (!mobile || !isValidMobile(mobile)) {
    return undefined;
  }
  if (!mobile.startsWith('+')) {
    mobile = '+' + mobile;
  }
  const info = extractMobileInfo(mobile);
  return `+${info.getCountryCode()}-${info.getNationalNumber()}`;
};

const extractMobileInfo = (mobile: string) => {
  return getInstance().parse(mobile);
};

export default {
  isValidMobile,
  initMobileNumber
};
