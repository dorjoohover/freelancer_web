export const checkRegisterNumber = (value: string): boolean => {
  const re = /^[\u0430-\u044F]{2}[0-9]{8}$/;

  return re.test(value?.toLowerCase());
};
export const checkRegisterNumberLatin = (value: string): boolean => {
  const re = /^[a-z]{2}[0-9]{8}$/;

  return re.test(value?.toLowerCase());
};
export const checkEmail = (value: string): boolean => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(value?.toLowerCase());
};
export const checkPassword = (value: string): boolean => {
  return value?.length > 5;
};

export const checkName = (value: string): boolean => {
  return value === undefined ? false : value?.length > 1;
};
