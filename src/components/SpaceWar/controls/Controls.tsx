import type { Object3D } from 'three'

import ConnectedCamera from '@/components/SpaceWar/connectedToStore/ConnectedCamera'
import TopDownCamera from '@/components/SpaceWar/cameras/TopDownCamera'

import { useStore } from '../store'

import Movement from './Movement'
import TopDownMovement from './TopDownMovement'

interface Props {
  target: Object3D
}

const Controls = ({ target }: Props) => {
  const mapView = useStore((state) => state.controls.mapView)

  return (
    <>
      {mapView && (
        <>
          <TopDownCamera target={target} />
          <TopDownMovement target={target} />
        </>
      )}
      {!mapView && (
        <>
          <ConnectedCamera target={target} />
          <Movement target={target} />
        </>
      )}
    </>
  )
}

export default Controls
