import type { Controls as AbstractControls } from '@/components/SpaceWar/types'

import { keys } from '../helpers/keys'
import type { StoreSlice } from './types'
import type { IState } from './store'
import type { InputMap } from './keyboard'

const initialState = {
  mapView: false,
}

export type Views = AbstractControls<keyof typeof initialState, boolean>

export type IViewState = {
  controls: Views
}

type View = keyof Views

export type ViewAction = Record<View, (skip: number) => void>

export const createViewState = () => ({ controls: initialState })

export const createViewActions: StoreSlice<IState, ViewAction> = (set) => {
  const actions = keys(initialState).reduce<ViewAction>((acc, control) => {
    acc[control] = (value: number) => {
      if (value === 0) {
        set((state) => ({
          controls: { ...state.controls, [control]: !state.controls[control] },
        }))
      }
    }
    return acc
  }, {} as ViewAction)

  return actions
}

const controlsInputMap: InputMap<Views> = {
  mapView: ['b'],
}

export const createViewInputMap = () => controlsInputMap
