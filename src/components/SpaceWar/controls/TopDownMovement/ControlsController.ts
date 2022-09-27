import type { Movements } from '@/components/SpaceWar/store/movement'

import { ControlsController } from '../types'

class MovementControlsController extends ControlsController {
  controls: Movements
}

export default MovementControlsController
