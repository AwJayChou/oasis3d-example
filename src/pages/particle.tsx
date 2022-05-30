/**
 * @title Skeleton Animation
 * @category Animation
 */
import { OrbitControl } from '@oasis-engine/controls'
//  import {
//    Animator,
//    Camera,
//    DirectLight,
//    GLTFResource,
//    Logger,
//    Vector3,
//    WebGLEngine
//  } from 'oasis-engine'
import {
  AssetType,
  Camera,
  Color,
  ParticleRenderer,
  Texture2D,
  Vector3,
  WebGLEngine
} from 'oasis-engine'
import React from 'react'
// https://oasisengine.cn/0.6/docs/sprite-renderer-cn
function createOasis () {
  /**
   * @title Particle Renderer
   * @category Particle
   */
  // import { OrbitControl } from "@oasis-engine/controls";
  // import { AssetType, Camera, Color, ParticleRenderer, Texture2D, Vector3, WebGLEngine } from "oasis-engine";

  //-- create engine object
  const engine = new WebGLEngine('canvas')
  engine.canvas.resizeByClientSize()

  const scene = engine.sceneManager.activeScene
  const rootEntity = scene.createRootEntity()

  //-- create camera
  const cameraEntity = rootEntity.createChild('camera_entity')
  cameraEntity.transform.position = new Vector3(0, 0, 50)
  cameraEntity.addComponent(Camera)

  engine.run()

  const particleEntity = rootEntity.createChild('particle')

  let particles: ParticleRenderer = particleEntity.addComponent(
    ParticleRenderer
  )

  engine.resourceManager
    .load<Texture2D>({
      url:
        'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*kxloQYq2YDEAAAAAAAAAAAAAARQnAQ',
      type: AssetType.Texture2D
    })
    .then(resource => {
      particles.maxCount = 1000
      particles.startTimeRandomness = 1000
      particles.lifetime = 5
      particles.position = new Vector3(0, 20, 0)
      particles.positionRandomness = new Vector3(100, 0, 0)
      particles.velocity = new Vector3(0, -3, 0)
      particles.velocityRandomness = new Vector3(2, 1, 0)
      particles.accelerationRandomness = new Vector3(5, 10, 0)
      particles.velocityRandomness = new Vector3(-1, -1, -1)
      // particles.rotateVelocity = 0.5
      particles.rotateVelocityRandomness = 1
      particles.size = 1
      particles.sizeRandomness = 0.8
      particles.color = new Color(0.5, 0.5, 0.5)
      particles.colorRandomness = 1
      // particles.isFadeIn = true
      // particles.isFadeOut = true
      particles.texture = resource
      particles.start()
    })
}

function App () {
  React.useEffect(() => {
    createOasis()
  }, [])

  return (
    <canvas id='canvas' style={{ width: '100vw', height: '100vh' }}></canvas>
  )
}

export default App
