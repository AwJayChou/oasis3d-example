  /**
   * @title Skeleton Animation
   * @category Animation
   */
   import { OrbitControl } from '@oasis-engine/controls'
   import {
     Animator,
     Camera,
     DirectLight,
     GLTFResource,
     Logger,
     Vector3,
     WebGLEngine
   } from 'oasis-engine'
   import React from 'react'
// https://oasisengine.cn/0.6/docs/sprite-renderer-cn
function createOasis () {

  Logger.enable()
  const engine = new WebGLEngine('canvas')
  engine.canvas.resizeByClientSize()

  const scene = engine.sceneManager.activeScene
  const rootEntity = scene.createRootEntity()

  // camera
  const cameraEntity = rootEntity.createChild('camera_node')
  cameraEntity.transform.position = new Vector3(0, 1, 5)
  cameraEntity.addComponent(Camera)
  cameraEntity.addComponent(OrbitControl).target = new Vector3(0, 1, 0)

  const lightNode = rootEntity.createChild('light_node')
  lightNode.addComponent(DirectLight).intensity = 0.8
  lightNode.transform.lookAt(new Vector3(0, 0, 1))
  lightNode.transform.rotate(new Vector3(0, 90, 0))

  engine.resourceManager
    .load<GLTFResource>(
      'https://gw.alipayobjects.com/os/basement_prod/aa318303-d7c9-4cb8-8c5a-9cf3855fd1e6.gltf'
    )
    .then(asset => {
      const { animations, defaultSceneRoot } = asset
      rootEntity.addChild(defaultSceneRoot)

      const animator = defaultSceneRoot.getComponent(Animator)
      animator.play(animations[0].name)
    })

  engine.run()
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
