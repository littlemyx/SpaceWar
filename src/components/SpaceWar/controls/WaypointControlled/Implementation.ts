import type { Vector3 } from '@react-three/fiber'
import { Vector3 as ThreeVector3 } from 'three'
import type { Object3D } from 'three'

class WaypointControlled {
  private target: Object3D
  private currentPosition: ThreeVector3
  private speed
  private api: any

  constructor(target: Object3D, speed = 10, api: any) {
    this.target = target
    this.api = api
    this.currentPosition = new ThreeVector3()
    this.speed = speed
  }

  update(delta: number, aim: Vector3) {
    const threeAim = new ThreeVector3(aim[0], aim[1], aim[2])
    const distance = this.target.position.distanceTo(threeAim)

    const step = this.speed * delta

    const t = step / distance

    const t1 = 1.0 - Math.pow(0.4, t)

    this.currentPosition.lerp(threeAim, t1)

    this.target.position.copy(this.currentPosition)
    this.api.position.set(
      this.currentPosition.x,
      this.currentPosition.y,
      this.currentPosition.z,
    )
  }
}

export default WaypointControlled
