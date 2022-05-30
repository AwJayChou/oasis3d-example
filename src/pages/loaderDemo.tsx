import React, { useRef } from 'react'
import { OrbitControl } from '@oasis-engine/controls'
import {
  Camera,
  GLTFResource,
  WebGLEngine,
  Script,
  Vector3,
  BackgroundMode,
  SkyBoxMaterial,
  PrimitiveMesh
} from 'oasis-engine'
// import { createOasis } from "../oasis";

// script 用来做动效
class Rotate extends Script {
  private _yAxis = new Vector3(0, 1, 0)
  onUpdate (deltaTime: number): void {
    this.entity.transform.rotate(this._yAxis)
  }
}

function App () {
  const canvasRef = useRef<any>()
  const createOasis = () => {
    const engine = new WebGLEngine('canvas')

    engine.canvas.resizeByClientSize()
    canvasRef.current = engine.canvas
    const scene = engine.sceneManager.activeScene
    const { background } = scene
    const rootEntity = scene.createRootEntity()

    // 添加天空盒背景
    background.mode = BackgroundMode.Sky // 默认纯色背景
    const skyMaterial = (background.sky.material = new SkyBoxMaterial(engine)) // 添加天空盒材质
    // skyMaterial.textureCubeMap = textureCube // 设置立方体纹理
    background.sky.mesh = PrimitiveMesh.createCuboid(engine, 2, 2, 2) // 设置天空盒网格

    // 初始化数据
    const cameraEntity = rootEntity.createChild('camera')
    cameraEntity.addComponent(Camera)
    // cameraEntity.transform.setPosition(3,3,3)
    cameraEntity.transform.setPosition(5, 3, 0)
    cameraEntity.addComponent(OrbitControl)

    // 环境光漫反射
    scene.ambientLight.diffuseSolidColor.setValue(1, 1, 1, 1)

    // loader
    engine.resourceManager
      .load<GLTFResource>(
        'https://gw.alipayobjects.com/os/OasisHub/267000040/9994/%25E5%25BD%2592%25E6%25A1%25A3.gltf'
      )
      .then(gltf => {
        const duck = gltf.defaultSceneRoot
        duck.addComponent(Rotate)
        rootEntity.addChild(duck)
      })
    console.log('## engine ==>', engine)
    engine.run()
  }
  React.useEffect(() => {
    createOasis()
    const resizeCb = () => {
      if (canvasRef.current) {
        canvasRef.current.resizeByClientSize()
      }
    }
    window.addEventListener('resize', resizeCb)
    return () => {
      window.removeEventListener('resize', resizeCb)
    }
  }, [])

  return (
    <canvas id='canvas' style={{ width: '100vw', height: '100vh' }}></canvas>
  )
}

export default App
