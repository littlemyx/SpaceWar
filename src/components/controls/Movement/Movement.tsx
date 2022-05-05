import { forwardRef, useEffect, useRef } from 'react'
import type { PropsWithChildren } from 'react'
// import { useFrame, useThree } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber'

import Controller from '@/components/controls/Movement/Implementation'
import BasicInput from '@/components/controls/BasicInput'
import type { Group } from 'three'

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

const BoxComponent = forwardRef<Group, PropsWithChildren<{}>>(
  ({ children }, ref) => {
    // const defaultCamera = useThree((state) => state.camera)
    const _controller = useRef(null)

    const group = useRef(null)
    const combinedRef = useCombinedRefs(ref, group)

    useFrame((state, delta) => {
      _controller.current.update(delta)
    })

    useEffect(() => {
      _controller.current = new Controller(
        combinedRef.current,
        new BasicInput(),
      )
    }, [])

    // Return the view, these are regular Threejs elements expressed in JSX
    return <group ref={combinedRef}>{children}</group>
  },
)

export default BoxComponent
