import type { Controls } from '@/components/SpaceWar/store/controls'

import { ControlsController } from '../types'

export type SpaceShipActions = keyof Controls

class MovementControlsController extends ControlsController {
  controls: Controls
}

export default MovementControlsController
