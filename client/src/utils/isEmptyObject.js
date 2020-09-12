const isEmptyObject = (obj) => {
  if (Object.keys(obj).length === 0 && obj.constructor === Object) {
    return true;
  }
  return false;
};

export default isEmptyObject;
