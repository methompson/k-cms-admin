function isTokenValid(token) {
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
