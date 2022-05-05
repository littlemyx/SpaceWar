import { useRef, useState, useEffect } from 'react'
import { OrbitControls } from '@react-three/drei'

import Box from './Box'
import Player from './Player'

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
  return (
    <>
      <LControl />
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
