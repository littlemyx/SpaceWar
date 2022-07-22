import { useRef, useState } from 'react'

import { Vector3 } from 'three'

import type { Color } from 'three'

interface Props {
  color: Color
  position: number[]
}

const BoxComponent = ({ color, position }: Props) => {
  // This reference will give us direct access to the THREE.Mesh object
  const mesh = useRef(null)
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      ref={mesh}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      scale={hovered ? 1.1 : 1}
      position={new Vector3(...position)}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial color={color} />
    </mesh>
  )
}
export default BoxComponent
