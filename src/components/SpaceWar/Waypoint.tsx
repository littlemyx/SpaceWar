import { useRef } from 'react'
import { Color } from 'three'

import Box from './models/Box'

interface Props {
  position: number[]
}

const Waypoint = ({ position }: Props) => {
  const color = useRef(new Color('red'))

  return <Box position={position} color={color.current} />
}

export default Waypoint
