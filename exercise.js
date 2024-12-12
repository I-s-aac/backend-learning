import { EventEmitter } from "node:events";

class Plant extends EventEmitter {
  constructor() {
    super();
    this.size = 0;
    this.hasBeenPlanted = false;

    this.registerListeners();
  }
  registerListeners() {
    this.on("error", this.errorListener);
    this.once("plantSeed", this.plantSeedListener);
    this.on("water", this.waterListener);
    this.on("bugAttack", this.bugAttackListener);
    this.on("harvest", this.harvestListener);
  }
  errorListener(err) {
    console.error(`an error occured from ${this}: `, err);
  }
  plantSeedListener() {
    this.hasBeenPlanted = true;
    this.size = 1;
    console.log("has been planted");
  }
  waterListener() {
    if (!this.hasBeenPlanted) {
      console.log("must be planted before watering");
    } else {
      this.size += 1;
    }
  }
  bugAttackListener() {
    if (!this.hasBeenPlanted) {
      console.log("bugs can't attack when not planted");
    } else {
      this.size -= 1;
    }
  }
  harvestListener() {
    if (!this.hasBeenPlanted) {
      console.log("can't harvest something that hasn't been planted");
    } else {
      // do something
    }
  }
}
