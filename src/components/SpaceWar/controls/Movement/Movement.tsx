import { forwardRef, useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

import type { PropsWithChildren } from 'react'
import type { Group } from 'three'

import { getState } from '@/components/SpaceWar/store'

import MovementControlsController from './ControlsController'
import Controller from './Implementation'

function useCombinedRefs(...refs) {
  const targetRef = useRef()

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return

      if (typeof ref === 'function') {
        ref(targetRef.current)
      } else {
        ref.current = targetRef.current
      }
    })
  }, [refs])

  return targetRef
}

const Movement = forwardRef<Group, PropsWithChildren<{}>>(
  ({ children }, ref) => {
    // const defaultCamera = useThree((state) => state.camera)
    const _controller = useRef<Controller>(null)

    const group = useRef(null)
    const combinedRef = useCombinedRefs(ref, group)

    useFrame((state, delta) => {
      _controller.current.update(delta)
    })

    useEffect(() => {
      _controller.current = new Controller(
        combinedRef.current,
        new MovementControlsController(getState),
      )
    }, [])

    // Return the view, these are regular Threejs elements expressed in JSX
    return <group ref={combinedRef}>{children}</group>
  },
)

export default Movement
