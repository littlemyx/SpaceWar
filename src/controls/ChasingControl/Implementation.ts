import { Vector3, EventDispatcher, Quaternion } from 'three'
import type { Object3D } from 'three'

type Keys = 'forward' | 'backward' | 'left' | 'right' | 'space' | 'shift'

class BasicInput {
  keys: Record<Keys, boolean>

  constructor() {
    this.keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      space: false,
      shift: false,
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
      case 32: // SPACE
        this.keys.space = false
        break
      case 16: // SHIFT
        this.keys.shift = false
        break
    }
  }
}

class Controller extends EventDispatcher {
  private target: Object3D

  private position: Vector3
  private velocity: Vector3
  private decceleration: Vector3
  private acceleration: Vector3

  private input: BasicInput

  constructor(target: Object3D) {
    super()

    this.target = target

    this.position = new Vector3(0, 0, 0)
    this.velocity = new Vector3()
    this.decceleration = new Vector3(-0.0005, -0.0001, -5.0)
    this.acceleration = new Vector3(1, 0.25, 50.0)

    this.input = new BasicInput()
  }
  update(delta: number) {
    if (!this.target) {
      return
    }

    const velocity = this.velocity
    const frameDecceleration = new Vector3(
      velocity.x * this.decceleration.x,
      velocity.y * this.decceleration.y,
      velocity.z * this.decceleration.z,
    )

    frameDecceleration.multiplyScalar(delta)
    frameDecceleration.z =
      Math.sign(frameDecceleration.z) *
      Math.min(Math.abs(frameDecceleration.z), Math.abs(velocity.z))

    velocity.add(frameDecceleration)

    const controlObject = this.target
    const _Q = new Quaternion()
    const _A = new Vector3()
    const _R = controlObject.quaternion.clone()

    const acceleration = this.acceleration.clone()

    if (this.input.keys.shift) {
      acceleration.multiplyScalar(2.0)
    }

    if (this.input.keys.forward) {
      velocity.z -= acceleration.z * delta
    }

    if (this.input.keys.backward) {
      velocity.z += acceleration.z * delta
    }

    if (this.input.keys.left) {
      _A.set(0, 1, 0)
      _Q.setFromAxisAngle(_A, 4.0 * Math.PI * delta * this.acceleration.y)
      _R.multiply(_Q)
    }

    if (this.input.keys.right) {
      _A.set(0, 1, 0)
      _Q.setFromAxisAngle(_A, 4.0 * -Math.PI * delta * this.acceleration.y)
      _R.multiply(_Q)
    }

    controlObject.quaternion.copy(_R)

    const forward = new Vector3(0, 0, 1)
    forward.applyQuaternion(controlObject.quaternion)
    forward.normalize()

    forward.multiplyScalar(velocity.z * delta)

    const sideways = new Vector3(1, 0, 0)
    sideways.applyQuaternion(controlObject.quaternion)
    sideways.normalize()

    sideways.multiplyScalar(velocity.x * delta)

    controlObject.position.add(forward)
    controlObject.position.add(sideways)
  }
}

export default Controller
