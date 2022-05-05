// import { useRef, useState, useEffect } from 'react'
// import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { PerspectiveCamera } from '@react-three/drei'
// import { useControls } from 'leva'

import Box from './Box'
import Player from './Player'

// import useStore from '@/helpers/store'

import SkyBox from './SkyBox'

// const LControl = () => {
//   const dom = useStore((state) => state.dom)
//   const control = useRef(null)

//   useEffect(() => {
//     if (control) {
//       dom.current.style['touch-action'] = 'none'
//     }
//   }, [dom, control])
//   // @ts-ignore
//   return <OrbitControls ref={control} domElement={dom.current} />
// }

const SpaceWar = () => {
  // const { angle } = useControls({
  //   angle: {
  //     value: 0,
  //     min: 0,
  //     max: Math.PI * 2,
  //     step: Math.PI / 180,
  //   },
  // })
  return (
    <>
      <PerspectiveCamera
        makeDefault
        fov={75}
        rotation={[0, Math.PI, 0]}
        position={[0, 10, -20]}
      />
      <SkyBox />
      <Player />
      <Box position={[40, 0, -40]} />
      <Box position={[40, 0, 40]} />
      <Box position={[-40, 0, -40]} />
      <Box position={[-40, 0, 40]} />
    </>
  )
}
export default SpaceWar
