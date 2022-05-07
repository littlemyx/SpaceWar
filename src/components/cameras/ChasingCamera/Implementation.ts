import type { Object3D, PerspectiveCamera } from 'three'
import { MathUtils } from 'three'
import { Vector3 } from 'three'

class ChasingCamera {
  private target: Object3D
  private camera: PerspectiveCamera
  private currentPosition: Vector3

  constructor(target: Object3D, camera: PerspectiveCamera) {
    this.target = target
    this.camera = camera
    this.currentPosition = new Vector3()
  }

  private calculateIdealOffset() {
    const idealOffset = new Vector3(0, 10, 20)
    idealOffset.applyQuaternion(this.target.quaternion)
    idealOffset.add(this.target.position)
    return idealOffset
  }

  update(delta: number, isAcceleration: boolean) {
    const idealOffset = this.calculateIdealOffset()

    const t1 = 1.0 - Math.pow(0.05, delta)
    const t2 = 1.0 - Math.pow(0.01, delta)

    this.currentPosition.lerp(idealOffset, t1)

    this.camera.position.copy(this.currentPosition)
    this.camera.quaternion.slerp(this.target.quaternion, t2)

    if (this.camera.fov < 120 && this.camera.fov > 75) {
      const t3 = 1.0 - Math.pow(0.05, delta)
      this.camera.fov = MathUtils.lerp(
        this.camera.fov,
        isAcceleration ? 120 : 75,
        t3,
      )
      this.camera.updateProjectionMatrix()
    }
  }
}

export default ChasingCamera
