import * as THREE from 'three';
import Camera from './Camera';
import Renderer from './Renderer';
import Resources from './Utils/Resources';
import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import World from './World/World';
import sources from './sources'
import Debug from './Utils/Debug';

let instance = null
export default class Experience {
  #canvas
  #sizes
  #time
  #scene
  #camera
  #renderer
  #world
  #resources
  #debug

  constructor(canvas) {
    if (instance) {
      return instance
    }

    instance = this

    window.experience = this
    this.#canvas = canvas
    this.#debug = new Debug()
    this.#sizes = new Sizes()
    this.#time = new Time()
    this.#scene = new THREE.Scene()
    this.#resources = new Resources(sources)
    this.#camera = new Camera()
    this.#renderer = new Renderer()

    this.#world = new World()

    this.#sizes.on('resize', this.#onResize)
    this.#time.on('tick', this.#update)

  }

  #onResize = () => {
    this.#camera.resize()
    this.#renderer.resize()
  }

  #update = () => {
    this.#camera.update()
    this.#world.update()
    this.#renderer.update()
  }

  destroy() {
    this.#sizes.off('resize', this.#onResize)
    this.#time.off('tick', this.#update)

    this.#scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose()

        for (const key in child.material) {
          const value = child.material[key]
          if (value && typeof value.dispose === 'function') {
            value.dispose()
          }
        }
      }
    })

    this.#camera.orbitControls.dispose()
    this.#renderer.instance.dispose()

    if (this.#debug.isActive) {
      this.#debug.gui.destroy()
    }
  }

  get canvas() {
    return this.#canvas
  }

  get sizes() {
    return this.#sizes
  }

  get time() {
    return this.#time
  }

  get scene() {
    return this.#scene
  }

  get camera() {
    return this.#camera
  }

  get resources() {
    return this.#resources
  }

  get debug() {
    return this.#debug
  }
}
