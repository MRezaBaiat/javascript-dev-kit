const initEmail = (email: string): string | undefined => {
  if (!email) {
    return undefined;
  }
  if (!isEmailValid(email)) {
    return undefined;
  }
  return email.toLowerCase();
};

const isEmailValid = (email: string): boolean => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export default {
  initEmail,
  isEmailValid
};
