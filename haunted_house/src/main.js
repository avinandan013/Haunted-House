import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { Timer } from 'three/addons/misc/Timer.js'

const gui = new dat.GUI()

/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

//floor texture

const floorAlphaTexture = textureLoader.load('./static/floor/alpha.jpg')
const floorColorTexture = textureLoader.load('./static/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.jpg')
const floorARMTexture = textureLoader.load('./static/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.jpg')
const floorNormalTexture = textureLoader.load('./static/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.jpg')
const floorDisplacementTexture = textureLoader.load('./static/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.jpg')

floorColorTexture.colorSpace = THREE.SRGBColorSpace

floorColorTexture.repeat.set(8,8)
floorARMTexture.repeat.set(8,8)
floorNormalTexture.repeat.set(8,8)
floorDisplacementTexture.repeat.set(8,8)

floorColorTexture.wrapS = THREE.RepeatWrapping
floorColorTexture.wrapT = THREE.RepeatWrapping

floorARMTexture.wrapS = THREE.RepeatWrapping
floorARMTexture.wrapT = THREE.RepeatWrapping

floorNormalTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping

floorDisplacementTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping


//wall texture

const wallColorTexture = textureLoader.load('./static/wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.jpg')
const wallARMTexture = textureLoader.load('./static/wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.jpg')
const wallNormalTexture = textureLoader.load('./static/wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.jpg')

wallColorTexture.colorSpace = THREE.SRGBColorSpace

wallColorTexture.wrapS = THREE.RepeatWrapping
wallColorTexture.wrapT = THREE.RepeatWrapping

wallARMTexture.wrapS = THREE.RepeatWrapping
wallARMTexture.wrapT = THREE.RepeatWrapping

wallNormalTexture.wrapS = THREE.RepeatWrapping
wallNormalTexture.wrapT = THREE.RepeatWrapping

//roof texture

const roofColorTexture = textureLoader.load('./static/roof/roof_slates_02_1k/roof_slates_02_diff_1k.jpg')
const roofARMTexture = textureLoader.load('./static/roof/roof_slates_02_1k/roof_slates_02_arm_1k.jpg')
const roofNormalTexture = textureLoader.load('./static/roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.jpg')

roofColorTexture.colorSpace = THREE.SRGBColorSpace

roofColorTexture.repeat.set(3,1)
roofARMTexture.repeat.set(3,1)
roofNormalTexture.repeat.set(3,1)

roofColorTexture.wrapS = THREE.RepeatWrapping
// roofColorTexture.wrapT = THREE.RepeatWrapping

roofARMTexture.wrapS = THREE.RepeatWrapping
// roofARMTexture.wrapT = THREE.RepeatWrapping

roofNormalTexture.wrapS = THREE.RepeatWrapping
// roofNormalTexture.wrapT = THREE.RepeatWrapping



//Door

const doorColorTexture = textureLoader.load('./static/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./static/door/alpha.jpg')
const doorRoughnessTexture = textureLoader.load('./static/door/roughness.jpg')
const doorMetalnessTexture = textureLoader.load('./static/door/metalness.jpg')
const doorNormalTexture = textureLoader.load('./static/door/normal.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./static/door/ambientOcclusion.jpg')
const doorDisplacementTexture = textureLoader.load('./static/door/height.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace


//Bush
const bushColorTexture = textureLoader.load('./static/bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.jpg')
const bushARMTexture = textureLoader.load('./static/bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.jpg')
const bushNormalTexture = textureLoader.load('./static/bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.jpg')

bushColorTexture.colorSpace = THREE.SRGBColorSpace

bushColorTexture.repeat.set(2,1)
bushARMTexture.repeat.set(2,1)
bushNormalTexture.repeat.set(2,1)

bushColorTexture.wrapS = THREE.RepeatWrapping



//Graves

const graveColorTexture = textureLoader.load('./static/grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.jpg')
const graveARMTexture = textureLoader.load('./static/grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.jpg')
const graveNormalTexture = textureLoader.load('./static/grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.jpg')

// graveColorTexture.colorSpace = THREE.SRGBColorSpace

graveColorTexture.repeat.set(0.3,0.4)
graveARMTexture.repeat.set(0.3,0.4)
graveNormalTexture.repeat.set(0.3,0.4)

graveColorTexture.wrapS = THREE.RepeatWrapping
graveARMTexture.wrapS = THREE.RepeatWrapping
graveNormalTexture.wrapS = THREE.RepeatWrapping

/**
 * House
 */


const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20,20,50,50),
  new THREE.MeshStandardMaterial({ 
    // wireframe: true,
    transparent: true, 
    alphaMap: floorAlphaTexture,
    map : floorColorTexture,
    aoMap: floorARMTexture,
    roughnessMap: floorARMTexture,
    metalnessMap: floorARMTexture,
    normalMap: floorNormalTexture,
    displacementMap: floorDisplacementTexture,
    displacementScale: 0.3,
    displacementBias: -0.2
  })
)
floor.rotation.x = -Math.PI*0.5
scene.add(floor)

gui.add(floor.material, 'displacementScale').min(0).max(1).step(0.001).name('floorDisplacement Scale')
gui.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001).name('floorDisplacementBias')

//house container
const house = new THREE.Group()
scene.add(house)
//walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4,2.5,4),
  new THREE.MeshStandardMaterial({
    map: wallColorTexture,
    aoMap: wallARMTexture,
    roughnessMap: wallARMTexture,
    metalnessMap: wallARMTexture,
    normalMap: wallNormalTexture
  })
)
walls.position.y += 2.5/2
house.add(walls)

//Roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5,1.5,4),
  new THREE.MeshStandardMaterial({
    map: roofColorTexture,
    aoMap: roofARMTexture,
    roughnessMap: roofARMTexture,
    metalnessMap: roofARMTexture,
    normalMap: roofNormalTexture
  })
)
roof.position.y = 2.5 + 0.75
roof.rotation.y = Math.PI * 0.25
house.add(roof)

//Door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2,2.2),
  new THREE.MeshStandardMaterial({
    transparent: true,
    alphaMap: doorAlphaTexture,
    map: doorColorTexture,
    aoMap: doorAmbientOcclusionTexture,
    roughnessMap: doorRoughnessTexture,
    metalnessMap: doorMetalnessTexture,
    normalMap: doorNormalTexture,
    displacementMap: doorDisplacementTexture
  })
)
door.position.y = 1.1
door.position.z = 2 + 0.01
house.add(door)

//Bushes
const bushGeometry = new THREE.SphereGeometry(1,16,16)
const bustMaterial = new THREE.MeshStandardMaterial(
  {
    color: '#ccffcc',
    map: bushColorTexture,
    aoMap: bushARMTexture,
    roughnessMap: bushARMTexture,
    metalnessMap: bushARMTexture,
    normalMap: bushNormalTexture
  }
)

const bush1 = new THREE.Mesh(bushGeometry, bustMaterial)
bush1.scale.set(0.5,0.5,0.5)
bush1.rotation.x = -0.75
bush1.position.set(0.8,0.2,2.2)

const bush2 = new THREE.Mesh(bushGeometry, bustMaterial)
bush2.scale.set(0.25,0.25,0.25)
bush2.rotation.x = -0.75
bush2.position.set(1.4,0.1,2.1)

const bush3 = new THREE.Mesh(bushGeometry, bustMaterial)
bush3.scale.set(0.4,0.4,0.4)
bush3.rotation.x = -0.75
bush3.position.set(-0.8,0.1,2.2)


const bush4 = new THREE.Mesh(bushGeometry, bustMaterial)
bush4.scale.set(0.15,0.15,0.15)
bush4.rotation.x = -0.75
bush4.position.set(-1,0.05,2.6)
house.add(bush1, bush2, bush3, bush4)


//Graveyards
const graveGeometry = new THREE.BoxGeometry(0.6,0.8,0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
  map: graveColorTexture,
  aoMap: graveARMTexture,
  roughnessMap: graveARMTexture,
  metalnessMap: graveARMTexture,
  normalMap: graveNormalTexture
})

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