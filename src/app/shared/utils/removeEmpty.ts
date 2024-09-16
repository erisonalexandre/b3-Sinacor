export function removeEmpty<T = Record<string, unknown>>(
  obj: T,
  removeEmptyString = true,
): {} {
  if (obj === null || obj === undefined) return obj;

  if (Array.isArray(obj)) {
    return obj
      .map((v) => removeEmpty(v, removeEmptyString))
      .filter(
        (v) =>
          !(v === null || v === undefined || (removeEmptyString && v === '')),
      );
  }

  if (typeof obj === 'object') {
    const newObj: Record<string, unknown> = {};
    Object.keys(obj).forEach((key) => {
      const value = obj[key as keyof T];
      if (value !== null && value !== undefined) {
        if (removeEmptyString && typeof value === 'string' && value === '') {
          return;
        }
        const newValue = removeEmpty(value, removeEmptyString);
        if (newValue !== null && newValue !== undefined) {
          newObj[key] = newValue;
        }
      }
    });

    return newObj;
  }

  return obj;
}
