import create from 'zustand'
import shallow from 'zustand/shallow'

import type { GetState, SetState, StateSelector } from 'zustand'

import type { IMovementState, MovementAction } from './movement'
import type { IViewState, ViewAction } from './view'

import type { InputMap } from './keyboard'

import {
  createMovementsActions,
  createMovementsState,
  createMovementsInputMap,
} from './movement'

import { createViewActions, createViewState, createViewInputMap } from './view'

type Getter = GetState<IState>
export type Setter = SetState<IState>

type Actions = MovementAction & ViewAction

type InputMaps = ReturnType<typeof createMovementsInputMap>

export type IState = {
  actions: Actions
  inputMap: InputMap<InputMaps>
  get: Getter
  set: Setter
} & IMovementState &
  IViewState

const useStoreImpl = create<IState>(
  (set: SetState<IState>, get: GetState<IState>) => {
    const state: IState = {
      actions: {
        ...createMovementsActions(set, get),
        ...createViewActions(set, get),
      },
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
