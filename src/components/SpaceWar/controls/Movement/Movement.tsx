import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

import { getState } from '@/components/SpaceWar/store'
import type { Object3D } from 'three'

import MovementControlsController from './ControlsController'
import Controller from './Implementation'

interface Props {
  target: Object3D
}

const Movement = ({ target }: Props) => {
  // const defaultCamera = useThree((state) => state.camera)
  const _controller = useRef<Controller>(null)

  useFrame((state, delta) => {
    _controller.current.update(delta)
  })

  useEffect(() => {
    _controller.current = new Controller(
      target,
      new MovementControlsController(getState),
    )
  }, [target])

  // Return the view, these are regular Threejs elements expressed in JSX
  return null
}

export default Movement
