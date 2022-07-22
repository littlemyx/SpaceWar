// import { useRef, useState, useEffect } from 'react'
// import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
// import { PerspectiveCamera } from '@react-three/drei'
// import { useControls } from 'leva'

import { Cameras } from './effects/Cameras'

import Player from './Player'

// import useStore from '@/helpers/store'

import SkyBox from './models/SkyBox'

import Keyboard from './controls/Keyboard'
import Waypoint from './Waypoint'

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
      <Cameras />
      <SkyBox />
      <Player />
      <Waypoint position={[40, 0, -40]} />
      <Waypoint position={[40, 0, 40]} />
      <Waypoint position={[-40, 0, -40]} />
      <Waypoint position={[-40, 0, 40]} />
      <Keyboard />
    </>
  )
}
export default SpaceWar
