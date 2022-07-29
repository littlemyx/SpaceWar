import type { Movements } from '@/components/SpaceWar/store/movement'

import { ControlsController } from '../types'

export type SpaceShipActions = keyof Movements

class MovementControlsController extends ControlsController {
  controls: Movements
}

export default MovementControlsController
