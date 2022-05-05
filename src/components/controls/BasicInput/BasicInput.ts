import type { InputKeys, Input } from '../types'

class BasicInput implements Input {
  keys: InputKeys

  constructor() {
    this.keys = {
      forward: 0,
      backward: 0,
      left: 0,
      right: 0,
      space: 0,
      shift: 0,
      rollLeft: 0,
      rollRight: 0,
      dive: 0,
      rise: 0,
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
        this.keys.forward = 1
        break
      case 65: // a
        this.keys.left = 1
        break
      case 83: // s
        this.keys.backward = 1
        break
      case 68: // d
        this.keys.right = 1
        break
      case 81: // q
        this.keys.rollLeft = 1
        break
      case 69: // e
        this.keys.rollRight = 1
        break
      case 38: // arrowUp
        this.keys.rise = 1
        break
      case 40: // arrowDown
        this.keys.dive = 1
        break
      case 32: // SPACE
        this.keys.space = 1
        break
      case 16: // SHIFT
        this.keys.shift = 1
        break
    }
  }

  private onKeyUp(event) {
    switch (event.keyCode) {
      case 87: // w
        this.keys.forward = 0
        break
      case 65: // a
        this.keys.left = 0
        break
      case 83: // s
        this.keys.backward = 0
        break
      case 68: // d
        this.keys.right = 0
        break
      case 81: // q
        this.keys.rollLeft = 0
        break
      case 69: // e
        this.keys.rollRight = 0
        break
      case 38: // arrowUp
        this.keys.rise = 0
        break
      case 40: // arrowDown
        this.keys.dive = 0
        break
      case 32: // SPACE
        this.keys.space = 0
        break
      case 16: // SHIFT
        this.keys.shift = 0
        break
    }
  }
}

export default BasicInput
