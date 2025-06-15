import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { Timer } from 'three/addons/misc/Timer.js'

/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * House
 */


const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20,20),
  new THREE.MeshStandardMaterial()
)
floor.rotation.x = -Math.PI*0.5
scene.add(floor)

//house container
const house = new THREE.Group()
scene.add(house)
//walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4,2.5,4),
  new THREE.MeshStandardMaterial()
)
walls.position.y += 2.5/2
house.add(walls)

//Roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5,1.5,4),
  new THREE.MeshStandardMaterial()
)
roof.position.y = 2.5 + 0.75
roof.rotation.y = Math.PI * 0.25
house.add(roof)

//Door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2,2.2),
  new THREE.MeshStandardMaterial({ color : 'red'})
)
door.position.y = 1.1
door.position.z = 2 + 0.0001
house.add(door)

//Bushes
const bushGeometry = new THREE.SphereGeometry(1,16,16)
const bustMaterial = new THREE.MeshStandardMaterial()

const bush1 = new THREE.Mesh(bushGeometry, bustMaterial)
bush1.scale.set(0.5,0.5,0.5)
bush1.position.set(0.8,0.2,2.2)

const bush2 = new THREE.Mesh(bushGeometry, bustMaterial)
bush2.scale.set(0.25,0.25,0.25)
bush2.position.set(1.4,0.1,2.1)

const bush3 = new THREE.Mesh(bushGeometry, bustMaterial)
bush3.scale.set(0.4,0.4,0.4)
bush3.position.set(-0.8,0.1,2.2)


const bush4 = new THREE.Mesh(bushGeometry, bustMaterial)
bush4.scale.set(0.15,0.15,0.15)
bush4.position.set(-1,0.05,2.6)
house.add(bush1, bush2, bush3, bush4)


//Graveyards
const graveGeometry = new THREE.BoxGeometry(0.6,0.8,0.2)
const graveMaterial = new THREE.MeshStandardMaterial()

const graves = new THREE.Group()
scene.add(graves)

for (let i =0; i<35; i++){

  const angle = Math.random() * Math.PI * 2

  const radius = 3 + Math.random()*4

  const x = Math.sin(angle) * radius
  const z = Math.cos(angle) * radius

  const grave = new THREE.Mesh( graveGeometry, graveMaterial )
  grave.position.x = x
  grave.position.y = Math.random() * 0.4
  grave.position.z = z

  grave.rotation.x = (Math.random() - 0.5) * 0.4
  grave.rotation.y = (Math.random() - 0.5) * 0.4
  grave.rotation.z = (Math.random() - 0.5) * 0.4
  graves.add(grave)
}







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