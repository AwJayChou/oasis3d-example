import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import App from './pages/cubeDemo'
import LoaderDemo from './pages/loaderDemo'
import BackDemo from './pages/backDemo'
import PointDemo from './pages/pointDemo'
import ClipDemo from './pages/clipDemo'
import LightDemo from './pages/lightDemo'
import SpotLightDemo from './pages/spotLight'
import SpriteDemo from './pages/sprite'
import AnimationDemo from './pages/animation'
import ParticleDemo from './pages/particle'
import ParticleDemo1 from './pages/particle1'
import ColiderShapeDemo from './pages/coliderShape'
import RayDemo from './pages/ray'
import PbrDemo from './pages/pbr'
import CustomShader from './pages/customShader'
import GameDemo from './pages/game'
ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="/loader" element={<LoaderDemo />}></Route>
          <Route path="/back" element={<BackDemo />}></Route>
          <Route path="/pointer" element={<PointDemo />}></Route>
          <Route path="/clip" element={<ClipDemo />}></Route>
          <Route path="/light" element={<LightDemo />}></Route>
          <Route path="/spotLight" element={<SpotLightDemo />}></Route>
          <Route path="/sprite" element={<SpriteDemo />}></Route>
          <Route path="/animation" element={<AnimationDemo />}></Route>
          <Route path="/particle" element={<ParticleDemo />}></Route>
          <Route path="/particle1" element={<ParticleDemo1 />}></Route>
          <Route path="/coliderShape" element={<ColiderShapeDemo />}></Route>
          <Route path="/pbr" element={<PbrDemo />}></Route>
          <Route path="/ray" element={<RayDemo />}></Route>
          <Route path="/shader" element={<CustomShader />}></Route>
          <Route path="/game1" element={<GameDemo />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
