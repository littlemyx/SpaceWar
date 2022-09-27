import { useState, useRef, useEffect } from 'react'
import { useBox } from '@react-three/cannon'

import Controls from '@/components/SpaceWar/controls'

import type { Group } from 'three'

const Player = () => {
  const [target, setTarget] = useState({ target: null, api: null })
  const targetRef = useRef<Group>(null)
  const [hovered, setHover] = useState(false)

  const [, api] = useBox(
    () => ({
      isTrigger: true,
      userData: { trigger: true },
      onCollideBegin: (event) => {
        console.log('triggered with', event)
      },
      type: 'Dynamic',
      args: [1, 1, 1],
      rotation: [0, 0, 0],
      position: [0, 0, 1],
    }),
    target.target,
  )

  useEffect(() => {
    setTarget({ target: targetRef.current, api })
  }, [targetRef])

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <group>
      <Controls target={target.target} api={target.api} />
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
