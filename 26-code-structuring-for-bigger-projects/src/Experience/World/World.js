import * as THREE from "three";
import Experience from "..";
import Environment from "./Environment";

export default class World {
  #experience
  #scene
  #environment

  constructor() {
    this.#experience = new Experience()
    this.#scene = this.#experience.scene

    const testMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: 0xff0000 })
    )
    testMesh.position.set(0, 0, 0)
    this.#scene.add(testMesh)

    this.#environment = new Environment()
  }
}