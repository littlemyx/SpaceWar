import type { GetState, SetState } from 'zustand'

// export type StoreSlice<T extends object, E extends object> = (
//   set: SetState<E>,
//   get: GetState<E>,
// ) => T

export type StoreSlice<T extends object, E> = (
  set: SetState<T>,
  get: GetState<T>,
) => E
