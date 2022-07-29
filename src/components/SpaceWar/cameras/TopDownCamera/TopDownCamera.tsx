import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

import type { Object3D, Camera, PerspectiveCamera } from 'three'

import TopDownCameraImplementation from './Implementation'

interface Props {
  target: Object3D
}

const TopDownCamera = ({ target }: Props) => {
  const controller = useRef<TopDownCameraImplementation>(null)

  const camera = useThree(({ camera }: { camera: Camera }) => camera)

  useEffect(() => {
    if (target !== null) {
      controller.current = new TopDownCameraImplementation(
        target,
        camera as PerspectiveCamera,
      )
    }
  }, [target, camera])

  useFrame(() => {
    if (controller.current !== null) {
      controller.current.update()
    }
  })

  return null
}
export default TopDownCamera
