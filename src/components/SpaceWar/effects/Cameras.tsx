// import { PerspectiveCamera, OrthographicCamera } from '@react-three/drei'
import { PerspectiveCamera } from '@react-three/drei'
import { useStore } from '../store'

export function Cameras() {
  const mapView = useStore((state) => state.controls.mapView)

  return (
    <>
      <PerspectiveCamera
        makeDefault={!mapView}
        fov={75}
        rotation={[0, Math.PI, 0]}
        position={[0, 10, -20]}
      />
      {/* <OrthographicCamera
        makeDefault={mapView}
        position={[0, 100, 0]}
        rotation={[(-1 * Math.PI) / 2, 0, Math.PI]}
        zoom={11}
      /> */}
      <PerspectiveCamera
        makeDefault={mapView}
        position={[0, 100, 0]}
        rotation={[(-1 * Math.PI) / 2, 0, 0]}
        // rotation={[0, Math.PI, 0]}
        fov={75}
        zoom={1}
      />
    </>
  )
}
