import type { GetState } from 'zustand'

import type { IState } from '@/components/SpaceWar/store'

import type { Controls, Waypoint } from '@/components/SpaceWar/types'

interface IConnectedToStore {
  provider: ZustandStoreProvider
  updateValues: () => void
}

export interface IControls extends IConnectedToStore {
  controls: Controls<string, number | boolean>
}
export interface IWaypoints extends IConnectedToStore {
  waypoints: Waypoint[]
}

type ZustandStoreProvider = GetState<IState>

export class ControlsController implements IControls {
  controls: Controls<string, number | boolean>
  provider: ZustandStoreProvider

  constructor(provider: ZustandStoreProvider) {
    this.provider = provider
    this.controls = this.provider().controls
  }

  updateValues() {
    this.controls = this.provider().controls
  }
}

export class WaypointsController implements IWaypoints {
  waypoints: Waypoint[]
  provider: ZustandStoreProvider

  constructor(provider: ZustandStoreProvider) {
    this.provider = provider
    this.waypoints = this.provider().waypoints
  }

  updateValues() {
    this.waypoints = this.provider().waypoints
  }
}
