import create from 'zustand'
import shallow from 'zustand/shallow'

import type { GetState, SetState, StateSelector } from 'zustand'

import type { Waypoint } from '../types'

import type { MovementAction, Movements } from './movement'
import type { ViewAction, Views } from './view'
import type { WaypointActions } from './waypoints'

import type { InputMap } from './keyboard'

import {
  createMovementsActions,
  createMovementsState,
  createMovementsInputMap,
} from './movement'

import { createViewActions, createViewState, createViewInputMap } from './view'

import {
  createWaypointActions,
  initialState as initialWaypoints,
} from './waypoints'

type Getter = GetState<IState>
export type Setter = SetState<IState>

type Actions = MovementAction & ViewAction & WaypointActions
type Controls = Views & Movements

type InputMaps = ReturnType<typeof createMovementsInputMap> &
  ReturnType<typeof createViewInputMap>

type stateInputMap = InputMap<InputMaps>

export type IState = {
  actions: Actions
  inputMap: stateInputMap
  controls: Controls
  waypoints: Waypoint[]
  get: Getter
  set: Setter
}

const useStoreImpl = create<IState>(
  (set: SetState<IState>, get: GetState<IState>) => {
    const state: IState = {
      actions: {
        ...createMovementsActions(set, get),
        ...createViewActions(set, get),
        ...createWaypointActions(set, get),
      },
      waypoints: initialWaypoints,
      inputMap: { ...createMovementsInputMap(), ...createViewInputMap() },
      controls: {
        ...createMovementsState().controls,
        ...createViewState().controls,
      },
      set,
      get,
    }
    return state
  },
)

const useStore = <T>(selector: StateSelector<IState, T>) =>
  useStoreImpl(selector, shallow)

Object.assign(useStore, useStoreImpl)

const { getState, setState } = useStoreImpl

export { getState, setState, useStore }
