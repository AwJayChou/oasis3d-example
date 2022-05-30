/**
 * @title Sprite Renderer
 * @category 2D
 */
import React from 'react'
import { OrbitControl } from '@oasis-engine/controls'
import {
  AssetType,
  Camera,
  Script,
  Sprite,
  SpriteRenderer,
  Texture2D,
  Vector3,
  WebGLEngine
} from 'oasis-engine'
// https://oasisengine.cn/0.6/docs/sprite-renderer-cn
function createOasis () {
  // Create engine object
  const engine = new WebGLEngine('canvas')
  engine.canvas.resizeByClientSize()

  const scene = engine.sceneManager.activeScene
  const rootEntity = scene.createRootEntity()

  // Create camera
  const cameraEntity = rootEntity.createChild('camera_entity')
  cameraEntity.transform.setPosition(0, 0, 50)
  cameraEntity.addComponent(Camera)
  cameraEntity.addComponent(OrbitControl)

  // Create sprite renderer
  engine.resourceManager
    .load<Texture2D>({
      url:
        'https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*ApFPTZSqcMkAAAAAAAAAAAAAARQnAQ',
      type: AssetType.Texture2D
    })
    .then(texture => {
      for (let i = 0; i < 10; ++i) {
        setTimeout(() => {
          const spriteEntity = rootEntity.createChild(`sprite_${i}`)
          spriteEntity.transform.position = new Vector3(0, 0, 0)
          const spriteRenderer = spriteEntity.addComponent(SpriteRenderer)
          const sprite = new Sprite(engine, texture)
          spriteRenderer.sprite = sprite
          // spriteRenderer.flipX = true;
          // spriteRenderer.flipY = true;
          const rect = spriteRenderer.sprite.region
          const scaleX = 100.0 / rect.width
          const scaleY = 100.0 / rect.height
          spriteEntity.transform.setScale(scaleX, scaleY, 1)
          spriteEntity.addComponent(SpriteController)
          // 时间过短会造成重影 比如1s
        }, 2000 * i)
      }
    })

  engine.run()

  // Script for sprite
  class SpriteController extends Script {
    static _curRotation: number = 0

    private _radius: number = 1.5
    // private _radius: number = 5.5
    private _curRadian: number
    private _scale: number
    private _scaleFlag: boolean

    onAwake () {
      this._curRadian = 0
      this._radius = 15
      this._scale = 0.5
      this._scaleFlag = true
    }

    onUpdate () {
      // Update position.
    //   this._curRadian += 0.005
      this._curRadian += 0.005
      const { _radius, _curRadian, entity } = this
      const { transform } = entity
      const posX = Math.cos(_curRadian) * _radius
      const posY = Math.sin(_curRadian) * _radius
      transform.setPosition(posX, posY, 0)

      // Update scale.
      this._scale += this._scaleFlag ? 0.005 : -0.005
      const { _scale } = this
      transform.setScale(_scale, _scale, _scale)
      if (this._scale >= 0.6) {
        this._scaleFlag = false
      } else if (this._scale <= 0.4) {
        this._scaleFlag = true
      }

      // Update rotation.
      SpriteController._curRotation += 0.05
      const { _curRotation } = SpriteController
      transform.setRotation(0, 0, _curRotation)
    }
  }
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
