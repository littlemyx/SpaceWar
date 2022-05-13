export const keys = <T extends Record<PropertyKey, unknown>>(
  obj: T,
): (keyof T)[] => Object.keys(obj)
