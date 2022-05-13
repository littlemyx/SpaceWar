export type Controls<
  T extends PropertyKey = PropertyKey,
  E extends string | number | boolean = boolean,
> = Record<T, E>
