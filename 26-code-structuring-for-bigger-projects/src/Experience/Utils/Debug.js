import * as lil from 'lil-gui'

export default class Debug {
  #isActive
  #gui

  constructor() {
    this.#isActive = window.location.hash === '#debug'

    if (this.#isActive) {
      this.#setup()
    }
  }

  #setup = () => {
    this.#gui = new lil.GUI()
  }

  get isActive() {
    return this.#isActive
  }

  get gui() {
    return this.#gui
  }
}