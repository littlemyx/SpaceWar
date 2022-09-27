import type { Object3D } from 'three'
// import { Vector3 } from 'three'

import ConnectedCamera from '@/components/SpaceWar/connectedToStore/ConnectedCamera'
import TopDownCamera from '@/components/SpaceWar/cameras/TopDownCamera'

import { useStore } from '../store'

import Movement from './Movement'
// import TopDownMovement from './TopDownMovement'
// import WaypointControlled from './WaypointControlled'
import MouseControl from './MouseControl'

interface Props {
  target: Object3D
  api: any
}

const Controls = ({ target, api }: Props) => {
  const mapView = useStore((state) => state.controls.mapView)

  return (
    <>
      {mapView && (
        <>
          <TopDownCamera target={target} />
          {/* <TopDownMovement target={target} /> */}
          <MouseControl target={target} api={api} />
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
