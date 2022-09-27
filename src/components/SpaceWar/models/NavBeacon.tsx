import type { Vector3 } from '@react-three/fiber'
import { useRef } from 'react'
import { Color } from 'three'

import Waypoint from '../Waypoint'
import Box from './Box'

interface Props {
  position: Vector3
  color?: string
}

const NavBeacon = ({ position, color: colorProp = 'red' }: Props) => {
  const color = useRef(new Color(colorProp))
  return (
    <Waypoint position={position}>
      <Box position={position} color={color.current} />
    </Waypoint>
  )
}

export default NavBeacon
