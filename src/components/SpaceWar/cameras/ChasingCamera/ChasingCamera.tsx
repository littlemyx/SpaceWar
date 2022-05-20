import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

import type { Object3D, Camera, PerspectiveCamera } from 'three'

import ChasingCameraImplementation from './Implementation'

import type { Effects } from './types'

interface Props {
  target: Object3D
  zoomingFOV: boolean
}

const ChasingCamera = ({ target, zoomingFOV }: Props) => {
  const controls = useRef<ChasingCameraImplementation>(null)
  const effects = useRef<Partial<Effects>>({})

  const camera = useThree(({ camera }: { camera: Camera }) => camera)

  useEffect(() => {
    if (target !== null) {
      controls.current = new ChasingCameraImplementation(
        target,
        camera as PerspectiveCamera,
      )
    }
  }, [target, camera])

  useFrame((_, delta) => {
    effects.current.zoomingFOV = zoomingFOV

    if (controls.current !== null) {
      controls.current.update(delta, effects.current)
    }
  })

  return null
}
export default ChasingCamera
