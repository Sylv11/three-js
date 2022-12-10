import * as THREE from "three"
import Experience from "../Experience"

export default class Floor {
  #experience
  #textures

  constructor() {
    this.#experience = new Experience()
    this.#setup()
  }

  #setup = () => {
    const { scene, resources } = this.#experience
    this.#textures = {}
    this.#textures.color = resources.items.grassColorTexture
    this.#textures.color.encoding = THREE.sRGBEncoding
    this.#textures.color.repeat.set(1.5, 1.5)
    this.#textures.color.wrapS = THREE.RepeatWrapping
    this.#textures.color.wrapT = THREE.RepeatWrapping

    this.#textures.normal = resources.items.grassNormalTexture
    this.#textures.normal.repeat.copy(this.#textures.color.repeat)
    this.#textures.normal.wrapS = THREE.RepeatWrapping
    this.#textures.normal.wrapT = THREE.RepeatWrapping

    const mesh = new THREE.Mesh(
      new THREE.CircleGeometry(5, 64),
      new THREE.MeshStandardMaterial({ map: this.#textures.color, normalMap: this.#textures.normal })
    )
    mesh.rotation.x = -Math.PI * 0.5
    mesh.receiveShadow = true
    scene.add(mesh)
  }
}