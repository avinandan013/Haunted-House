import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { Timer } from 'three/addons/misc/Timer.js'

/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * Object
 */
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1,32,32),
  new THREE.MeshStandardMaterial({roughness: 0.7})
)
scene.add(sphere)

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20,20),
  new THREE.MeshStandardMaterial()
)
floor.rotation.x = -Math.PI*0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight('#ffffff',0.5)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight('#ffffff',1)
directionalLight.position.set(3,2,-8)
scene.add(directionalLight)

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight)
camera.position.set(4,2,5)
scene.add(camera)

/**
 * canvas
 */
const canvas = document.querySelector('.webgl')

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas:canvas,
  antialias: true
})
renderer.setSize(window.innerWidth,window.innerHeight)
// renderer.render(scene,camera)

/**
 * Orbit Controller
 */
const orbitControls = new OrbitControls(camera,canvas)

/**
 * Animate
 */
const timer = new Timer
const animate =()=>{
  timer.update()
  const elapsedTime = timer.getElapsed()
  
  renderer.render(scene,camera)
  window.requestAnimationFrame(animate)
}
animate()