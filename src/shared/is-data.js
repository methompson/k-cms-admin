const isObject = (x) => {
  return typeof x === typeof {} && !Array.isArray(x) && x !== null;
};

const isArray = (x) => {
  return Array.isArray(x);
};

const isNumber = (x) => {
  return typeof x === typeof 1 && !Number.isNaN(x);
};

const isString = (x) => {
  return typeof x === typeof "string";
};

const isBoolean = (x) => {
  return typeof x === typeof true;
};

const isFunction = (x) => {
  const func = () => {};
  return typeof x === typeof func;
};

const isUndefined = (x) => {
  let undef;
  return x === undef;
};

export {
  isObject,
  isArray,
  isNumber,
  isString,
  isBoolean,
  isUndefined,
  isFunction,
};
