import EventEmitter from "./EventEmitter";

export default class Time extends EventEmitter {

  #start;
  #current;
  #elapsed;
  #deltaTime;


  constructor() {
    super();

    this.#start = Date.now();
    this.#current = this.#start;
    this.#elapsed = 0;
    this.#deltaTime = 16;

    requestAnimationFrame(this.#tick);
  }

  #tick = () => {
    const currentTime = Date.now();
    this.#deltaTime = currentTime - this.#current;
    this.#current = currentTime;
    this.#elapsed = currentTime - this.#start;

    this.trigger('tick');

    requestAnimationFrame(this.#tick);
  }

  get deltaTime() {
    return this.#deltaTime;
  }

  get elapsed() {
    return this.#elapsed;
  }

  get current() {
    return this.#current;
  }

  get start() {
    return this.#start;
  }
}