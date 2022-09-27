import type { StoreSlice } from './types'
import type { IState } from './store'

import type { Waypoint } from '../types'

export const initialState = []

export type WaypointActions = {
  addWaypoint: (waypoint: Waypoint) => void
  removeWaypoint: (waypoint: Waypoint) => void
}

export const createWaypointActions: StoreSlice<IState, WaypointActions> = (
  set,
) => {
  const actions: WaypointActions = {
    addWaypoint: (waypoint: Waypoint) => {
      set((state) => ({
        waypoints: [...state.waypoints, waypoint],
      }))
    },
    removeWaypoint: (waypoint: Waypoint) => {
      set((state) => {
        const { waypoints } = state

        const newWaypoints = [...waypoints].reduce(
          (acc, item) => (waypoint.id === item.id ? acc : [...acc, item]),
          [],
        )

        return {
          waypoints: newWaypoints,
        }
      })
    },
  }

  return actions
}
