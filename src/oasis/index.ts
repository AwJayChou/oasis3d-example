import {
	BlinnPhongMaterial,
	Camera,
	MeshRenderer,
	PrimitiveMesh,
	Vector3,
	WebGLEngine,
} from "oasis-engine";

import { OrbitControl } from "@oasis-engine/controls";

export function createOasis() {
	const engine = new WebGLEngine("canvas");
	engine.canvas.resizeByClientSize();
	const scene = engine.sceneManager.activeScene;
	// group 理解为 group 继承与object3d
	const rootEntity = scene.createRootEntity();

	// init camera
	// 理解为子group group.name = 'camera'
	const cameraEntity = rootEntity.createChild("camera");
	cameraEntity.addComponent(Camera);
	cameraEntity.addComponent(OrbitControl)
	const pos = cameraEntity.transform.position;
	// pos.setValue(10, 10, 10);
	pos.setValue(100, 0, 0);
	cameraEntity.transform.position = pos;
	cameraEntity.transform.lookAt(new Vector3(0, 0, 0));

	// init light
	scene.ambientLight.diffuseSolidColor.setValue(1, 1, 1, 1);

// uniform vec3 diffuse; // 漫反射颜色

// uniform vec3 emissive; // 自发光颜色

// uniform float roughness; // 粗糙度

// uniform float metalness; // 金属性

// uniform float opacity;  // 透明度
	scene.ambientLight.diffuseIntensity = 1.2;

	// init cube
	const cubeEntity = rootEntity.createChild("cube");
	// mesh 相当于three.js 
	const renderer = cubeEntity.addComponent(MeshRenderer);
	const mtl = new BlinnPhongMaterial(engine);
	const color = mtl.baseColor;
	color.r = 1.0;
	color.g = 0.8;
	color.b = 0.5;
	color.a = 1.0;
	// 创建一个正方体
	renderer.mesh = PrimitiveMesh.createCuboid(engine, 5, 5, 5);
	renderer.setMaterial(mtl);

	engine.run();
}
