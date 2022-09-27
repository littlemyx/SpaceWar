import type { MutableRefObject } from 'react'
import { forwardRef, useRef, useState } from 'react'
import { Vector3 as ThreeVector3 } from 'three'

import type { Color } from 'three'
import type { Vector3 } from '@react-three/fiber'
import type { ThreeEvent } from '@react-three/fiber'

interface Props {
  color: Color
  position: Vector3
  onClick?: (event: ThreeEvent<MouseEvent>) => void
}

const BoxComponent = (
  { color, position, onClick }: Props,
  ref: MutableRefObject<any>,
) => {
  // This reference will give us direct access to the THREE.Mesh object
  // const mesh = useRef(null)
  const positionRef = useRef(
    new ThreeVector3(position[0], position[1], position[2]),
  )
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      ref={ref}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={onClick}
      scale={hovered ? 3 : 1}
      position={positionRef.current}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial color={color} />
    </mesh>
  )
}
export default forwardRef(BoxComponent)
