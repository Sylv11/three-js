import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Experience from ".";

export default class Camera {
  #experience
  #sizes
  #scene
  #canvas
  #instance
  #orbitControls

  constructor() {
    this.#experience = new Experience()

    this.#sizes = this.#experience.sizes
    this.#scene = this.#experience.scene
    this.#canvas = this.#experience.canvas

    this.#setInstance()
    this.#setOrbitControls()

  }

  get instance() {
    return this.#instance
  }

  #setInstance = () => {
    this.#instance = new THREE.PerspectiveCamera(35, this.#sizes.width / this.#sizes.height, 0.1, 100)
    this.#instance.position.set(6, 4, 8)
    this.#scene.add(this.#instance)
  }

  #setOrbitControls = () => {
    this.#orbitControls = new OrbitControls(this.#instance, this.#canvas)
    this.#orbitControls.enableDamping = true
  }

  resize = () => {
    this.#instance.aspect = this.#sizes.width / this.#sizes.height
    this.#instance.updateProjectionMatrix()
  }

  update = () => {
    this.#orbitControls.update()
  }
}