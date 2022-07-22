import { useState, useRef, useEffect } from 'react'

import Controls from '@/components/SpaceWar/controls'

import type { Group } from 'three'

const Player = () => {
  const [target, setTarget] = useState(null)
  const targetRef = useRef<Group>(null)
  const [hovered, setHover] = useState(false)

  useEffect(() => {
    setTarget(targetRef.current)
  }, [targetRef])

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <group>
      <Controls target={target} />
      <group ref={targetRef}>
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
    </group>
  )
}
export default Player
