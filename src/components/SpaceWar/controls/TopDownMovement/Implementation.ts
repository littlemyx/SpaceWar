import { Vector3, Quaternion } from 'three'
import type { Object3D } from 'three'

import type MovementControlsController from './ControlsController'

class Controller {
  private target: Object3D

  private position: Vector3
  private velocity: Vector3
  private decceleration: Vector3
  private movementAcceleration: Vector3
  private rotationAcceleration: Vector3

  controls: MovementControlsController

  constructor(target: Object3D, controls: MovementControlsController) {
    this.target = target

    this.position = new Vector3(0, 0, 0)
    this.velocity = new Vector3()
    this.decceleration = new Vector3(-5.0, -0.0001, -5.0)
    this.movementAcceleration = new Vector3(25.0, 25.0, 50.0)
    this.rotationAcceleration = new Vector3(1.0, 0.25, 50.0)

    this.controls = controls
  }

  update(delta: number) {
    if (!this.target) {
      return
    }

    this.controls.updateValues()
    const frameActions = this.controls.controls

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

    if (frameActions.accelerate > 0) {
      movementAcceleration.multiplyScalar(4.0)
    }

    if (frameActions.forward > 0) {
      velocity.z -= movementAcceleration.z * delta
    }

    if (frameActions.backward > 0) {
      velocity.z += movementAcceleration.z * delta
    }

    if (frameActions.strafeLeft > 0) {
      velocity.x -= movementAcceleration.x * delta
    }

    if (frameActions.strafeRight > 0) {
      velocity.x += movementAcceleration.x * delta
    }

    if (frameActions.yawLeft > 0) {
      _A.set(0, 1, 0)
      _Q.setFromAxisAngle(
        _A,
        4.0 * Math.PI * delta * this.rotationAcceleration.y,
      )
      _R.multiply(_Q)
    }

    if (frameActions.yawRight > 0) {
      _A.set(0, 1, 0)
      _Q.setFromAxisAngle(
        _A,
        4.0 * -Math.PI * delta * this.rotationAcceleration.y,
      )
      _R.multiply(_Q)
    }

    if (frameActions.rollLeft > 0) {
      _A.set(0, 0, 1)
      _Q.setFromAxisAngle(
        _A,
        0.005 * Math.PI * delta * this.rotationAcceleration.z,
      )
      _R.multiply(_Q)
    }

    if (frameActions.rollRight > 0) {
      _A.set(0, 0, 1)
      _Q.setFromAxisAngle(
        _A,
        0.005 * -Math.PI * delta * this.rotationAcceleration.z,
      )
      _R.multiply(_Q)
    }

    if (frameActions.dive > 0) {
      _A.set(1, 0, 0)
      _Q.setFromAxisAngle(
        _A,
        1.0 * Math.PI * delta * this.rotationAcceleration.x,
      )
      _R.multiply(_Q)
    }

    if (frameActions.rise > 0) {
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
