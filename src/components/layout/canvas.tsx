import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import useStore from '@/helpers/store'

const LCanvas = ({ children }) => {
  const dom = useStore((state) => state.dom)

  return (
    <Canvas
      style={{
        position: 'absolute',
        top: 0,
      }}
      onCreated={(state) => state.events.connect(dom.current)}
    >
      <Preload all />
      {children}
    </Canvas>
  )
}

export default LCanvas
