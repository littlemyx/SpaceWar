import { useEffect, useRef } from 'react'
import type { Vector3 } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber'

import type { Object3D } from 'three'

import Controller from './Implementation'

interface Props {
  target: Object3D
  aim: Vector3 | null
  api: any
}

const WaypointControlled = ({ target, aim, api }: Props) => {
  // const defaultCamera = useThree((state) => state.camera)
  const _controller = useRef<Controller>(null)
  // const [isReached, setIsReached] = useState(false)

  useEffect(() => {
    if (target !== null) {
      _controller.current = new Controller(target, 50, api)
    }
  }, [target])

  useFrame((_, delta) => {
    if (_controller.current !== null && aim !== null) {
      _controller.current.update(delta, aim)
    }
  })

  // Return the view, these are regular Threejs elements expressed in JSX
  return null
}

export default WaypointControlled
