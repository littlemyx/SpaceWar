import { Quaternion, Vector3 } from 'three'
import type { Object3D, PerspectiveCamera } from 'three'

class TopDownCamera {
  private target: Object3D
  private camera: PerspectiveCamera

  constructor(target: Object3D, camera: PerspectiveCamera) {
    this.target = target
    this.camera = camera
  }

  update() {
    const newPosition = new Vector3(
      this.target.position.x,
      100,
      this.target.position.z,
    )

    const newRotation = new Quaternion()
    const zRotation = new Quaternion(
      this.target.quaternion.x,
      this.target.quaternion.y,
      this.target.quaternion.z,
      this.target.quaternion.w,
    )
    const topDownRotation = new Quaternion()
    const zeroRotation = new Quaternion()

    newRotation.multiply(zRotation)

    topDownRotation.setFromAxisAngle(new Vector3(-1, 0, 0), Math.PI / 2)

    newRotation.multiply(topDownRotation)

    zeroRotation.setFromAxisAngle(new Vector3(0, 0, 1), 0)

    newRotation.multiply(zeroRotation)

    this.camera.position.copy(newPosition)
    this.camera.quaternion.copy(newRotation)
  }
}

export default TopDownCamera
