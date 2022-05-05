import type { Group } from 'three'
import { Vector3 } from 'three'

// import type { Object3D } from 'three'
import type { Camera } from '@react-three/fiber'
import type { MutableRefObject } from 'react'

class ChasingCamera {
  private target: MutableRefObject<Group>
  private camera: Camera
  private currentPosition: Vector3
  private currentLookat: Vector3

  constructor(target: MutableRefObject<Group>, camera: Camera) {
    this.target = target
    this.camera = camera
    this.currentPosition = new Vector3()
    this.currentLookat = new Vector3()
  }

  private calculateIdealOffset() {
    const idealOffset = new Vector3(0, 10, -30)
    idealOffset.applyQuaternion(this.target.current.quaternion)
    idealOffset.add(this.target.current.position)
    return idealOffset
  }

  private calculateIdealLookat() {
    const idealLookat = new Vector3(0, 10, 50)
    idealLookat.applyQuaternion(this.target.current.quaternion)
    idealLookat.add(this.target.current.position)
    return idealLookat
  }

  update(delta: number) {
    const idealOffset = this.calculateIdealOffset()
    const idealLookat = this.calculateIdealLookat()

    const t = 1.0 - Math.pow(0.001, delta)

    this.currentPosition.lerp(idealOffset, t)
    this.currentLookat.lerp(idealLookat, t)

    this.camera.position.copy(this.currentPosition)
    this.camera.lookAt(this.currentLookat)
  }
}

export default ChasingCamera
