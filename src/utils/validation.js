export const required = value =>
  !value ||
  (typeof value === 'string' && !value.trim()) ||
  (Array.isArray(value) && !value.length)
    ? 'validation.required'
    : undefined;
