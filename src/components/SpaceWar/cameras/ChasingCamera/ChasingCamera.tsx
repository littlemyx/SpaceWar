import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

import type { PropsWithChildren } from 'react'
import type { Object3D, Camera, PerspectiveCamera } from 'three'

import ChasingCameraImplementation from './Implementation'

interface Props {
  target: Object3D
}

const ChasingCamera = ({ children, target }: PropsWithChildren<Props>) => {
  const controls = useRef<ChasingCameraImplementation>(null)

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
    if (controls.current !== null) {
      controls.current.update(delta)
    }
  })

  return <group>{children}</group>
}
export default ChasingCamera
