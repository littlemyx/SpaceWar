import { useRef, useState } from 'react'

const BoxComponent = ({color, ...props} ) => {
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
        {...props}
      >
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial color={color} />
      </mesh>
  )
}
export default BoxComponent
