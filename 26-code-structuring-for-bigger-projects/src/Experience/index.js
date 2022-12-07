import Sizes from "./Utils/Sizes"

export default class Experience {
  #canvas
  #sizes

  constructor(canvas) {
    this.#canvas = canvas

    this.#sizes = new Sizes()

    this.#sizes.on('resize', this.onResize)
  }

  onResize = () => {
    this.#canvas.width = this.#sizes.width
    this.#canvas.height = this.#sizes.height
  }
}