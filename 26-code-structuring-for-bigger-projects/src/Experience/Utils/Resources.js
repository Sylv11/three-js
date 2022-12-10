import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import EventEmitter from "./EventEmitter";

export default class Resources extends EventEmitter {

  #sources
  #items
  #toLoad
  #loaded
  #loaders

  constructor(sources) {
    super()

    this.#sources = sources
    this.#items = {}
    this.#toLoad = this.#sources.length
    this.#loaded = 0
    this.#loaders = {}

    this.#setLoaders()
    this.#startLoading()
  }

  #setLoaders = () => {
    this.#loaders.gltfLoader = new GLTFLoader()
    this.#loaders.textureLoader = new THREE.TextureLoader()
    this.#loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
  }

  #startLoading = () => {
    this.#sources.forEach(source => {
      this.#loaders[`${source.type}Loader`].load(
        source.path,
        (item) => {
          this.#onLoad(source.name, item)
        },
        undefined,
        (error) => {
          this.#onError(source.name, error)
        }
      )
    })
  }

  #onLoad = (name, item) => {
    this.#items[name] = item
    this.#loaded++

    this.trigger('progress')

    if (this.#loaded === this.#toLoad) {
      this.trigger('complete')
    }
  }

  #onError = (name, error) => {
    console.error(`Error loading ${name} resource: ${error}`)
  }

  get items() {
    return this.#items
  }

}