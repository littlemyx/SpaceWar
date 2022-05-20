import type { Object3D } from 'three'

import ChasingCamera from '../cameras/ChasingCamera'

import { useStore } from '../store'

interface Props {
  target: Object3D
}

const ConnectedCamera = ({ target }: Props) => {
  const controls = useStore((s) => s.controls)

  return <ChasingCamera target={target} zoomingFOV={controls.accelerate > 0} />
}

export default ConnectedCamera
