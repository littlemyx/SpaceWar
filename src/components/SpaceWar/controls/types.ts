import type { GetState } from 'zustand'

import type { IState } from '@/components/SpaceWar/store'

import type { Controls } from '@/components/SpaceWar/types'

export interface IControls {
  controls: Controls<string, number | boolean>
  updateActions: () => void
}

type ZustandStoreProvider = GetState<IState>

export class ControlsController implements IControls {
  controls: Controls<string, number | boolean>
  provider: ZustandStoreProvider

  constructor(provider: ZustandStoreProvider) {
    this.provider = provider
    this.controls = this.provider().controls
  }

  updateActions() {
    this.controls = this.provider().controls
  }
}
