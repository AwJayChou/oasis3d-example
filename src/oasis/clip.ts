import {
  WebGLEngine,
  Camera,
  Script,
  BlinnPhongMaterial,
  MeshRenderer,
  PrimitiveMesh,
  DirectLight,
  Color,
  Vector3,
} from 'oasis-engine';
import * as dat from 'dat.gui';
import { OrbitControl, FreeControl } from '@oasis-engine/controls';

const gui = new dat.GUI();

class Rotation extends Script {
  onUpdate(deltaTime: number): void {
    this.entity.transform.rotate(new Vector3(1, 1, 1));
  }
}

// 用oasis 画一个正方形和一个圆形 并且可以旋转
export function createOasis() {
  // 初始化 render
  const engine = new WebGLEngine('canvas');
  // 实现自动缩放
  engine.canvas.resizeByClientSize();

  const scene = engine.sceneManager.activeScene;
  const rootEntity = scene.createRootEntity('demo');

  // scene.ambientLight.diffuseSolidColor = new Color(1, 1,1)
  // 相机还没加
  const cameraEntity = rootEntity.createChild('camera');
  cameraEntity.addComponent(Camera);
  //   cameraEntity.addComponent(OrbitControl);
  cameraEntity.addComponent(FreeControl);
  cameraEntity.transform.setPosition(0, 0, 20);
  // 加入光源
  const lightEntity = rootEntity.createChild('light');
  const light = lightEntity.addComponent(DirectLight);
  light.intensity = 1.2;
  lightEntity.transform.setRotation(0, 45, 0);
  // 创建子元素

  const shape1 = rootEntity.createChild('shape1');
  const shape2 = rootEntity.createChild('shape2');

  shape1.addComponent(Rotation);
  shape2.addComponent(Rotation);
  // 设置实例位置
  shape1.transform.setPosition(-3, 0, 0);
  shape2.transform.setPosition(3, 0, 0);

  const render1 = shape1.addComponent(MeshRenderer);
  const render2 = shape2.addComponent(MeshRenderer);
  // 创建material
  const material1 = new BlinnPhongMaterial(engine);
  material1.baseColor.setValue(1, 0, 0, 1);
  const material2 = new BlinnPhongMaterial(engine);
  material2.baseColor.setValue(0, 0, 1, 1);

  // 创建geometry
  const geometry1 = PrimitiveMesh.createCuboid(engine, 2, 2, 2);
  const geometry2 = PrimitiveMesh.createSphere(engine, 2);

  render1.mesh = geometry1;
  render2.mesh = geometry2;

  render1.setMaterial(material1);
  render2.setMaterial(material2);

  // observe renderer-cull
  const state = {
    cube1: '正常渲染',
    cube2: '正常渲染',
  };

  class ObserverScript extends Script {
    onUpdate() {
      state.cube1 = render1.isCulled ? '视锥体裁剪' : '正常渲染';
      state.cube2 = render2.isCulled ? '视锥体裁剪' : '正常渲染';
    }
  }

  rootEntity.addComponent(ObserverScript);

  const folder = gui.addFolder('移动视角，观察视锥体裁剪情况');
  folder.add(state, 'cube1').name('红色立方体').listen();
  folder.add(state, 'cube2').name('蓝色球体').listen();
  folder.open();

  // 相当于webglRender.render() 方法
  engine.run();
}
