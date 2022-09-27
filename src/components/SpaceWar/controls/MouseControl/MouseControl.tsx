import type { Object3D } from 'three'

import { useStore } from '../../store'

import WaypointControlled from '../WaypointControlled'

interface Props {
  target: Object3D
  api: any
}

const MouseControl = ({ target, api }: Props) => {
  const waypoints = useStore((s) => s.waypoints)

  return (
    <WaypointControlled
      target={target}
      api={api}
      aim={waypoints[0]?.position || null}
    />
  )
}

export default MouseControl
