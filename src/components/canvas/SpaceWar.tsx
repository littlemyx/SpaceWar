import { useRef, useState, useEffect } from 'react'
import { OrbitControls } from '@react-three/drei'

import useStore from '@/helpers/store'

import SkyBox from './SkyBox'

const LControl = () => {
  const dom = useStore((state) => state.dom)
  const control = useRef(null)

  useEffect(() => {
    if (control) {
      dom.current.style['touch-action'] = 'none'
    }
  }, [dom, control])
  // @ts-ignore
  return <OrbitControls ref={control} domElement={dom.current} />
}

const SpaceWar = () => {
  // This reference will give us direct access to the THREE.Mesh object
  const mesh = useRef(null)
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <>
      <LControl />
      <SkyBox />
      <mesh ref={mesh} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)} scale={hovered ? 1.1 : 1}>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial color="hotpink" />
      </mesh>
      <directionalLight position={[5, 5, 5]} />
      <ambientLight />
    </>
  )
}
export default SpaceWar
