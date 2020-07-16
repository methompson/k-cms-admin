import { isString } from "./is-data";

function slugify(name) {
  if (!isString(name)) {
    return "";
  }

  const lowerCase = name.toLowerCase().trim();

  let newName = "";
  const regex = RegExp(/[a-z0-9-]/);

  for (let x = 0, len = lowerCase.length; x < len; ++x) {
    const char = lowerCase.substring(x, x + 1);
    const result = regex.test(char);
    if (char === " ") {
      newName += "-";
    } else if (result) {
      newName += char;
    }
  }

  return newName;
}

function checkSlug(slug) {
  if (!isString(slug)) {
    return false;
  }

  if (slug.length === 0) {
    return false;
  }

  // The hat character indicates that we are checking if there are characters
  // NOT in the list.
  const regex = RegExp(/[^a-z0-9-]+/);

  // We don't return regex.test directly.
  if (regex.test(slug)) {
    return false;
  }

  return true;
}

export {
  slugify,
  checkSlug,
};
