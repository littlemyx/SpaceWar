import type { Object3D } from 'three'
import { Vector3 } from 'three'

// import type { Object3D } from 'three'
import type { Camera } from '@react-three/fiber'

class ChasingCamera {
  private target: Object3D
  private camera: Camera
  private currentPosition: Vector3

  constructor(target: Object3D, camera: Camera) {
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

  update(delta: number) {
    const idealOffset = this.calculateIdealOffset()

    const t1 = 1.0 - Math.pow(0.05, delta)
    const t2 = 1.0 - Math.pow(0.01, delta)

    this.currentPosition.lerp(idealOffset, t1)

    this.camera.position.copy(this.currentPosition)
    this.camera.quaternion.slerp(this.target.quaternion, t2)
  }
}

export default ChasingCamera
