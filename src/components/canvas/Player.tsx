import { useState, useRef } from 'react'

import Movement from '@/components/controls/Movement'
import ChasingCamera from '@/components/cameras/ChasingCamera'
import type { Group } from 'three'

const BoxComponent = () => {
  const target = useRef<Group>(null)
  const [hovered, setHover] = useState(false)

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <ChasingCamera target={target}>
      <Movement ref={target}>
        <group>
          <mesh
            position={[0, 0, 1]}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            scale={hovered ? 1.1 : 1}
          >
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshPhysicalMaterial color="purple" />
          </mesh>
          <mesh
            position={[0, 0, -1]}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            scale={hovered ? 1.1 : 1}
          >
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshPhysicalMaterial color="hotpink" />
          </mesh>

          <directionalLight position={[5, 5, 5]} />
          <ambientLight />
        </group>
      </Movement>
    </ChasingCamera>
  )
}
export default BoxComponent
