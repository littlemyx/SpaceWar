import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { CubeTextureLoader } from 'three'

const SkyBox = () => {
  const { scene } = useThree()

  useEffect(() => {
    const loader = new CubeTextureLoader()

    const texture = loader.load([
      './resources/terrain/space-posx.jpg',
      './resources/terrain/space-negx.jpg',
      './resources/terrain/space-posy.jpg',
      './resources/terrain/space-negy.jpg',
      './resources/terrain/space-posz.jpg',
      './resources/terrain/space-negz.jpg',
    ])
    // Set the scene background property to the resulting texture.
    scene.background = texture
  }, [scene])

  return null
}

export default SkyBox
