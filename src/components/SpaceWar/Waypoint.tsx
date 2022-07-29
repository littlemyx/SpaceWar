import { useRef } from 'react'
import { Color } from 'three'

import Box from './models/Box'

interface Props {
  position: number[]
  color?: string
}

const Waypoint = ({ position, color: colorProp = 'red' }: Props) => {
  const color = useRef(new Color(colorProp))

  return <Box position={position} color={color.current} />
}

export default Waypoint
