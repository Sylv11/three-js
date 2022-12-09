import EventEmitter from "./EventEmitter"

export default class Sizes extends EventEmitter {
  #width
  #height
  #pixelRatio

  constructor() {
    super()

    this.#width = window.innerWidth
    this.#height = window.innerHeight
    this.#pixelRatio = Math.min(window.devicePixelRatio, 2)

    window.addEventListener('resize', this.onResize)
  }

  get width() {
    return this.#width
  }

  get height() {
    return this.#height
  }

  get pixelRatio() {
    return this.#pixelRatio
  }

  onResize = () => {
    this.#width = window.innerWidth
    this.#height = window.innerHeight
    this.#pixelRatio = window.devicePixelRatio

    this.trigger('resize')
  }
}