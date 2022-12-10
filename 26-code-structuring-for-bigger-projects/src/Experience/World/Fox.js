import * as THREE from "three"
import Experience from "../Experience"

export default class Fox {
  #experience
  #animation
  #foxScene
  #resources
  #debug
  #debugFolder

  constructor() {
    this.#experience = new Experience()
    this.#debug = this.#experience.debug
    this.#resources = this.#experience.resources

    if (this.#debug.isActive) {
      this.#debugFolder = this.#debug.gui.addFolder('Fox')
    }

    this.#setup()
  }

  #setup = () => {
    const { scene } = this.#experience
    this.#foxScene = this.#resources.items.foxModel.scene
    this.#foxScene.scale.set(0.02, 0.02, 0.02)
    scene.add(this.#foxScene)

    this.#foxScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
      }
    })

    this.#setAnimation()
  }

  #setAnimation = () => {
    this.#animation = {}
    this.#animation.mixer = new THREE.AnimationMixer(this.#foxScene)

    this.#animation.actions = {}

    this.#animation.actions.idle = this.#animation.mixer.clipAction(this.#resources.items.foxModel.animations[0])
    this.#animation.actions.walking = this.#animation.mixer.clipAction(this.#resources.items.foxModel.animations[1])
    this.#animation.actions.running = this.#animation.mixer.clipAction(this.#resources.items.foxModel.animations[2])

    this.#animation.actions.current = this.#animation.actions.idle
    this.#animation.actions.current.play()

    this.#animation.play = (name) => {
      const newAction = this.#animation.actions[name]
      const oldAction = this.#animation.actions.current

      if (newAction !== oldAction) {
        newAction.reset()
        newAction.play()
        newAction.crossFadeFrom(oldAction, 0.5, true)
        this.#animation.actions.current = newAction
      }
    }

    if (this.#debug.isActive) {
      const debugObject = {
        playIdle: () => this.#animation.play('idle'),
        playWalking: () => this.#animation.play('walking'),
        playRunning: () => this.#animation.play('running')
      }

      this.#debugFolder.add(debugObject, 'playIdle')
      this.#debugFolder.add(debugObject, 'playWalking')
      this.#debugFolder.add(debugObject, 'playRunning')
    }
  }

  update() {
    if (this.#animation)
      this.#animation.mixer.update(this.#experience.time.deltaTime * 0.001)
  }

}