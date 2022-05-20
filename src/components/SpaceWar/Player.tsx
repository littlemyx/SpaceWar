import { useState, useRef, useEffect } from 'react'

import Movement from '@/components/SpaceWar/controls/Movement'
import ConnectedCamera from '@/components/SpaceWar/connectedToStore/ConnectedCamera'
import type { Group } from 'three'

const BoxComponent = () => {
  const [target, setTarget] = useState(null)
  const targetRef = useRef<Group>(null)
  const [hovered, setHover] = useState(false)

  useEffect(() => {
    setTarget(targetRef.current)
  }, [targetRef])

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <group>
      <ConnectedCamera target={target} />
      <Movement ref={targetRef}>
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
    </group>
  )
}
export default BoxComponent
