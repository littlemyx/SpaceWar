import create from 'zustand'
import shallow from 'zustand/shallow'

import type { GetState, SetState, StateSelector } from 'zustand'

import type { IControlsState, ControlAction } from './controls'
import type { IViewState, ViewAction } from './view'

import type { InputMap } from './keyboard'

import {
  createControlsActions,
  createControlsState,
  createControlsInputMap,
} from './controls'

import { createViewActions, createViewState, createViewInputMap } from './view'

type Getter = GetState<IState>
export type Setter = SetState<IState>

type Actions = ControlAction & ViewAction

type InputMaps = ReturnType<typeof createControlsInputMap>

export type IState = {
  actions: Actions
  inputMap: InputMap<InputMaps>
  get: Getter
  set: Setter
} & IControlsState &
  IViewState

const useStoreImpl = create<IState>(
  (set: SetState<IState>, get: GetState<IState>) => {
    const state: IState = {
      actions: {
        ...createControlsActions(set, get),
        ...createViewActions(set, get),
      },
      inputMap: { ...createControlsInputMap(), ...createViewInputMap() },
      controls: {
        ...createControlsState().controls,
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
