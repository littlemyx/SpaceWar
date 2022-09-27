import type { Vector3 } from '@react-three/fiber'
import type { nanoid } from 'nanoid'

export type Controls<
  T extends PropertyKey = PropertyKey,
  E extends string | number | boolean = boolean,
> = Record<T, E>

export type Waypoint = { position: Vector3; id: ReturnType<typeof nanoid> }
