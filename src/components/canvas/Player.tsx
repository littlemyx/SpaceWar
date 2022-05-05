import { useEffect, useRef, useState } from 'react'
// import { useFrame, useThree } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber'

import Controller from '@/controls/ChasingControl/Implementation'
import BasicInput from '@/controls/BasicInput'

const BoxComponent = () => {
  // const defaultCamera = useThree((state) => state.camera)
  const _controller = useRef(null)

  const group = useRef(null)
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame

  useFrame((state, delta) => {
    _controller.current.update(delta)
  })

  useEffect(() => {
    _controller.current = new Controller(group.current, new BasicInput())
  }, [])

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <group ref={group}>
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
  )
}
export default BoxComponent
