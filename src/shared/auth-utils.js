import * as jwt from 'jsonwebtoken';

function isTokenValid(token) {
  const decode = jwt.decode(token);
  if (!decode) {
    return null;
  }

  const now = new Date().getTime();
  if (decode.exp * 1000 <= now) {
    return null;
  }

  return decode;
}

export {
  isTokenValid,
};
