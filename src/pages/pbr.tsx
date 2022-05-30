/**
 * @title PBR Base
 * @category Material
 */
import React from 'react';
import { OrbitControl } from '@oasis-engine/controls'
import * as dat from 'dat.gui'
import {
  AmbientLight,
  AssetType,
  BackgroundMode,
  Camera,
  DirectLight,
  GLTFResource,
  PrimitiveMesh,
  SkyBoxMaterial,
  Vector3,
  WebGLEngine
} from 'oasis-engine'

function createOasis () {
  //-- create engine object
  const engine = new WebGLEngine('canvas')
  engine.canvas.resizeByClientSize()

  const scene = engine.sceneManager.activeScene
  const { ambientLight, background } = scene
  const rootEntity = scene.createRootEntity()

  const gui = new dat.GUI()
  const envFolder = gui.addFolder('EnvironmentMapLight')
  envFolder.add(ambientLight, 'specularIntensity', 0, 1)
  envFolder.add(ambientLight, 'diffuseIntensity', 0, 1)

  const directLightNode = rootEntity.createChild('dir_light')
  const directLight = directLightNode.addComponent(DirectLight)
  const dirFolder = gui.addFolder('DirectionalLight1')
  directLight.intensity = 0.5
  dirFolder.add(directLight, 'enabled')
  dirFolder.add(directLight, 'intensity', 0, 1)
  directLightNode.transform.setPosition(5, 5, 5)
  directLightNode.transform.lookAt(new Vector3(0, 0, 0))

  //Create camera
  const cameraNode = rootEntity.createChild('camera_node')
  cameraNode.transform.position = new Vector3(0.25, 0.5, 1.5)
  cameraNode.addComponent(Camera)
  const control = cameraNode.addComponent(OrbitControl)
  control.target.setValue(0.25, 0.25, 0)

  // Create sky
  const sky = background.sky
  const skyMaterial = new SkyBoxMaterial(engine)
  background.mode = BackgroundMode.Sky
  sky.material = skyMaterial
  sky.mesh = PrimitiveMesh.createCuboid(engine, 1, 1, 1)

  Promise.all([
    engine.resourceManager
      .load<GLTFResource>(
        'https://gw.alipayobjects.com/os/bmw-prod/477b0093-7ee8-41af-a0dd-836608a4f130.gltf'
      )
      .then(gltf => {
        const { defaultSceneRoot, entities, materials } = gltf
        rootEntity.addChild(defaultSceneRoot)
        defaultSceneRoot.transform.setScale(100, 100, 100)
        console.log(gltf)
        // entities[57].isActive = false;
      }),
    engine.resourceManager
      .load<AmbientLight>({
        type: AssetType.Env,
        url:
          'https://gw.alipayobjects.com/os/bmw-prod/34986a5b-fa16-40f1-83c8-1885efe855d2.bin'
      })
      .then(ambientLight => {
        console.log('## ambientLight ==>', ambientLight)
        scene.ambientLight = ambientLight
        skyMaterial.textureCubeMap = ambientLight.specularTexture
        skyMaterial.textureDecodeRGBM = true
      })
  ]).then(() => {
    engine.run()
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
