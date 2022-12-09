import * as THREE from 'three';
import Camera from './Camera';
import Renderer from './Renderer';
import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import World from './World/World';

let instance = null
export default class Experience {
  #canvas
  #sizes
  #time
  #scene
  #camera
  #renderer
  #world

  constructor(canvas) {
    if (instance) {
      return instance
    }

    instance = this

    this.#canvas = canvas
    this.#sizes = new Sizes()
    this.#time = new Time()
    this.#scene = new THREE.Scene()
    this.#camera = new Camera()
    this.#renderer = new Renderer()

    this.#world = new World()

    this.#sizes.on('resize', this.onResize)
    this.#time.on('tick', this.update)

  }

  onResize = () => {
    this.#camera.resize()
    this.#renderer.resize()
  }

  update = () => {
    this.#camera.update()
    this.#renderer.update()
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
}
