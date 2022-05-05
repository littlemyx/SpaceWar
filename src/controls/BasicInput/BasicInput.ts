import type { Keys, Input } from '../types'

class BasicInput implements Input {
  keys: Record<Keys, boolean>

  constructor() {
    this.keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      space: false,
      shift: false,
      rollLeft: false,
      rollRight: false,
      dive: false,
      rise: false,
    }

    document.addEventListener(
      'keydown',
      (event) => this.onKeyDown(event),
      false,
    )
    document.addEventListener('keyup', (event) => this.onKeyUp(event), false)
  }

  private onKeyDown(event) {
    switch (event.keyCode) {
      case 87: // w
        this.keys.forward = true
        break
      case 65: // a
        this.keys.left = true
        break
      case 83: // s
        this.keys.backward = true
        break
      case 68: // d
        this.keys.right = true
        break
      case 81: // q
        this.keys.rollLeft = true
        break
      case 69: // e
        this.keys.rollRight = true
        break
      case 38: // arrowUp
        this.keys.rise = true
        break
      case 40: // arrowDown
        this.keys.dive = true
        break
      case 32: // SPACE
        this.keys.space = true
        break
      case 16: // SHIFT
        this.keys.shift = true
        break
    }
  }

  private onKeyUp(event) {
    switch (event.keyCode) {
      case 87: // w
        this.keys.forward = false
        break
      case 65: // a
        this.keys.left = false
        break
      case 83: // s
        this.keys.backward = false
        break
      case 68: // d
        this.keys.right = false
        break
      case 81: // q
        this.keys.rollLeft = false
        break
      case 69: // e
        this.keys.rollRight = false
        break
      case 38: // arrowUp
        this.keys.rise = false
        break
      case 40: // arrowDown
        this.keys.dive = false
        break
      case 32: // SPACE
        this.keys.space = false
        break
      case 16: // SHIFT
        this.keys.shift = false
        break
    }
  }
}

export default BasicInput
