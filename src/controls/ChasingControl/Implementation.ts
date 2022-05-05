import { Vector3, EventDispatcher, Quaternion } from 'three'
import type { Object3D } from 'three'

import type { Input } from '../types'

class Controller extends EventDispatcher {
  private target: Object3D

  private position: Vector3
  private velocity: Vector3
  private decceleration: Vector3
  private acceleration: Vector3

  private input: Input

  constructor(target: Object3D, input: Input) {
    super()

    this.target = target

    this.position = new Vector3(0, 0, 0)
    this.velocity = new Vector3()
    this.decceleration = new Vector3(-0.0005, -0.0001, -5.0)
    this.acceleration = new Vector3(1.0, 0.25, 50.0)

    this.input = input
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

    if (this.input.keys.rollLeft) {
      _A.set(0, 0, 1)
      _Q.setFromAxisAngle(_A, 0.005 * Math.PI * delta * this.acceleration.z)
      _R.multiply(_Q)
    }

    if (this.input.keys.rollRight) {
      _A.set(0, 0, 1)
      _Q.setFromAxisAngle(_A, 0.005 * -Math.PI * delta * this.acceleration.z)
      _R.multiply(_Q)
    }

    if (this.input.keys.dive) {
      _A.set(1, 0, 0)
      _Q.setFromAxisAngle(_A, 1.0 * Math.PI * delta * this.acceleration.x)
      _R.multiply(_Q)
    }

    if (this.input.keys.rise) {
      _A.set(1, 0, 0)
      _Q.setFromAxisAngle(_A, 1.0 * -Math.PI * delta * this.acceleration.x)
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
