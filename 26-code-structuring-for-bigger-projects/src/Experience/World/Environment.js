import * as THREE from "three";
import Experience from "../Experience";

export default class Environment {
  #experience
  #scene
  #resources
  #environmentMap
  #debug
  #debugFolder

  constructor() {
    this.#experience = new Experience()
    this.#scene = this.#experience.scene
    this.#resources = this.#experience.resources
    this.#debug = this.#experience.debug

    if (this.#debug.isActive) {
      this.#debugFolder = this.#debug.gui.addFolder('Environment')
    }

    this.#setSunLight()
    this.#setEnvironmentMap()
  }

  #setSunLight = () => {
    const directionalLight = new THREE.DirectionalLight('#ffffff', 4)
    directionalLight.castShadow = true
    directionalLight.shadow.camera.far = 15
    directionalLight.shadow.mapSize.set(1024, 1024)
    directionalLight.shadow.normalBias = 0.05
    directionalLight.position.set(3.5, 2, - 1.25)
    this.#scene.add(directionalLight)

    if (this.#debug.isActive) {
      this.#debugFolder.add(directionalLight.position, 'x').name('sunLightX').min(- 5).max(5).step(0.001)
      this.#debugFolder.add(directionalLight.position, 'y').name('sunLightY').min(- 5).max(5).step(0.001)
      this.#debugFolder.add(directionalLight.position, 'z').name('sunLightZ').min(- 5).max(5).step(0.001)
      this.#debugFolder.add(directionalLight, 'intensity').name('sunLightIntensity').min(0).max(10).step(0.001)
    }
  }

  #setEnvironmentMap = () => {
    this.#environmentMap = {}
    this.#environmentMap.intensity = 0.4
    this.#environmentMap.texture = this.#resources.items.environmentMapTexture
    this.#environmentMap.texture.encoding = THREE.sRGBEncoding

    this.#scene.environment = this.#environmentMap.texture

    this.#environmentMap.updateMaterials = () => {
      this.#scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          child.material.envMap = this.#environmentMap.texture
          child.material.envMapIntensity = this.#environmentMap.intensity
          child.material.needsUpdate = true
        }
      })
    }

    this.#environmentMap.updateMaterials()

    if (this.#debug.isActive) {
      this.#debugFolder.add(this.#environmentMap, 'intensity').name('environmentMapIntensity').min(0).max(4).step(0.001).onChange(this.#environmentMap.updateMaterials)
    }
  }

}