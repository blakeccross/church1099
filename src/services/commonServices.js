const whiteSpaces = (txt) => {
  let r = txt.replace(/\s/g, "");
  return r.length == 0;
};
export const commonServices = {
  whiteSpaces,
};
