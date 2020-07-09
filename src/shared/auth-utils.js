import { isObject } from "@/shared/is-data";

function isTokenValid(token) {
  if (!isObject(token)) {
    return false;
  }

  if (!("exp" in token)) {
    return false;
  }

  const now = new Date().getTime();
  if (token.exp * 1000 <= now) {
    return false;
  }

  return true;
}

export {
  isTokenValid,
};
