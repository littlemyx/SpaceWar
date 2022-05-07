import { Vector3, EventDispatcher, Quaternion } from 'three'
import type { Object3D } from 'three'

import type { Input } from '../types'

class Controller extends EventDispatcher {
  private target: Object3D

  private position: Vector3
  private velocity: Vector3
  private decceleration: Vector3
  private movementAcceleration: Vector3
  private rotationAcceleration: Vector3
  private onAcceleratingChange: (state: boolean) => void

  input: Input

  constructor(
    target: Object3D,
    input: Input,
    onAcceleratingChange: (state: boolean) => void,
  ) {
    super()

    this.target = target

    this.position = new Vector3(0, 0, 0)
    this.velocity = new Vector3()
    this.decceleration = new Vector3(-5.0, -0.0001, -5.0)
    this.movementAcceleration = new Vector3(25.0, 25.0, 50.0)
    this.rotationAcceleration = new Vector3(1.0, 0.25, 50.0)
    this.onAcceleratingChange = onAcceleratingChange

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

    frameDecceleration.x =
      Math.sign(frameDecceleration.x) *
      Math.min(Math.abs(frameDecceleration.x), Math.abs(25))

    velocity.add(frameDecceleration)

    const controlObject = this.target
    const _Q = new Quaternion()
    const _A = new Vector3()
    const _R = controlObject.quaternion.clone()

    const movementAcceleration = this.movementAcceleration.clone()

    if (this.input.keys.shift) {
      movementAcceleration.multiplyScalar(4.0)
    }

    if (this.input.keys.forward > 0) {
      velocity.z -= movementAcceleration.z * delta
    }

    if (this.input.keys.backward > 0) {
      velocity.z += movementAcceleration.z * delta
    }

    if (this.input.keys.strafeLeft > 0) {
      velocity.x -= movementAcceleration.x * delta
    }

    if (this.input.keys.strafeRight > 0) {
      velocity.x += movementAcceleration.x * delta
    }

    if (this.input.keys.yawLeft > 0) {
      _A.set(0, 1, 0)
      _Q.setFromAxisAngle(
        _A,
        4.0 * Math.PI * delta * this.rotationAcceleration.y,
      )
      _R.multiply(_Q)
    }

    if (this.input.keys.yawRight > 0) {
      _A.set(0, 1, 0)
      _Q.setFromAxisAngle(
        _A,
        4.0 * -Math.PI * delta * this.rotationAcceleration.y,
      )
      _R.multiply(_Q)
    }

    if (this.input.keys.rollLeft > 0) {
      _A.set(0, 0, 1)
      _Q.setFromAxisAngle(
        _A,
        0.005 * Math.PI * delta * this.rotationAcceleration.z,
      )
      _R.multiply(_Q)
    }

    if (this.input.keys.rollRight > 0) {
      _A.set(0, 0, 1)
      _Q.setFromAxisAngle(
        _A,
        0.005 * -Math.PI * delta * this.rotationAcceleration.z,
      )
      _R.multiply(_Q)
    }

    if (this.input.keys.dive > 0) {
      _A.set(1, 0, 0)
      _Q.setFromAxisAngle(
        _A,
        1.0 * Math.PI * delta * this.rotationAcceleration.x,
      )
      _R.multiply(_Q)
    }

    if (this.input.keys.rise > 0) {
      _A.set(1, 0, 0)
      _Q.setFromAxisAngle(
        _A,
        1.0 * -Math.PI * delta * this.rotationAcceleration.x,
      )
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

    const strafe = new Vector3(0, 1, 0)
    strafe.applyQuaternion(controlObject.quaternion)
    strafe.normalize()

    strafe.multiplyScalar(velocity.y * delta)

    controlObject.position.add(forward)
    controlObject.position.add(sideways)
    controlObject.position.add(strafe)
  }
}

export default Controller
