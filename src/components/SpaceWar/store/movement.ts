import type { Controls as AbstractControls } from '@/components/SpaceWar/types'

import { keys } from '../helpers/keys'
import type { StoreSlice } from './types'
import type { IState } from './store'
import type { InputMap } from './keyboard'

const initialState = {
  forward: 0,
  backward: 0,
  strafeLeft: 0,
  strafeRight: 0,
  action: 0,
  accelerate: 0,
  rollLeft: 0,
  rollRight: 0,
  dive: 0,
  rise: 0,
  yawLeft: 0,
  yawRight: 0,
}

export type Movements = AbstractControls<keyof typeof initialState, number>

export type IMovementState = {
  controls: Movements
}

type Movement = keyof Movements

export type MovementAction = Record<Movement, (value: number) => void>

export const createMovementsState = () => ({ controls: initialState })

export const createMovementsActions: StoreSlice<IState, MovementAction> = (
  set,
) => {
  const actions = keys(initialState).reduce<MovementAction>((acc, control) => {
    acc[control] = (value: number) => {
      set((state) => ({
        controls: { ...state.controls, [control]: value },
      }))
    }
    return acc
  }, {} as MovementAction)

  return actions
}

const controlsInputMap: InputMap<Movements> = {
  forward: ['w'],
  backward: ['s'],
  strafeLeft: ['a'],
  strafeRight: ['d'],
  action: [' '],
  accelerate: ['shift'],
  rollLeft: ['q'],
  rollRight: ['e'],
  dive: ['arrowdown'],
  rise: ['arrowup'],
  yawLeft: ['arrowleft'],
  yawRight: ['arrowright'],
}

export const createMovementsInputMap = (): InputMap<Movements> =>
  controlsInputMap
