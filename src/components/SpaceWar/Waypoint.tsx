import type { PropsWithChildren } from 'react'
import { useBox } from '@react-three/cannon'
import { useRef, useEffect, useCallback } from 'react'
import { nanoid } from 'nanoid'

import { useStore } from './store'

import type { Waypoint as WaypointType } from './types'
import type { Vector3 } from '@react-three/fiber'

interface Props {
  position: Vector3
}

const Waypoint = ({ children, position }: PropsWithChildren<Props>) => {
  useBox(
    () => ({
      isTrigger: true,
      userData: { trigger: true },
      onCollideBegin: () => {
        removeWaypoint(waypointRef.current)
      },
      type: 'Dynamic',
      args: [0.1, 0.1, 0.1],
      rotation: [0, 0, 0],
      position: [position[0], position[1], position[2]],
    }),
    null,
  )

  const [addWaypoint, removeWaypoint] = useStore(
    ({ actions: { addWaypoint, removeWaypoint } }) => [
      addWaypoint,
      removeWaypoint,
    ],
  )

  const waypointRef = useRef<WaypointType>({
    position,
    id: nanoid(),
  })

  useEffect(
    () => () => {
      removeWaypoint(waypointRef.current)
    },
    [],
  )

  const onClickHandler = useCallback(() => {
    addWaypoint(waypointRef.current)
  }, [])

  return <group onClick={onClickHandler}>{children}</group>
}

export default Waypoint
