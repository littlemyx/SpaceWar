import type { Object3D } from 'three'

import ConnectedCamera from '@/components/SpaceWar/connectedToStore/ConnectedCamera'

import { useStore } from '../store'

import Movement from './Movement'

interface Props {
  target: Object3D
}

const Controls = ({ target }: Props) => {
  const mapView = useStore((state) => state.controls.mapView)

  return (
    <>
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
