import { EventEmitter } from "node:events";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
const rl = readline.createInterface({ input, output });

class Plant extends EventEmitter {
  constructor() {
    super();
    this.size = 0;
    this.hasBeenPlanted = false;

    this.registerListeners();
  }
  registerListeners() {
    this.on("error", this.error);
    this.once("plantSeed", this.plantSeed);
    this.on("water", this.water);
    this.on("bugAttack", this.bugAttack);
    this.on("harvest", this.harvest);
  }
  error(err) {
    console.error(`an error occured from ${this}: `, err);
  }
  plantSeed() {
    this.hasBeenPlanted = true;
    this.size = 1;
    console.log(`seed has been planted, current size is ${this.size}`);
  }
  water() {
    if (!this.hasBeenPlanted) {
      console.log("must be planted before watering");
    } else {
      this.size += 1;
      console.log(`plant has grown, current size: ${this.size}`);
    }
  }
  bugAttack() {
    if (!this.hasBeenPlanted) {
      console.log("bugs can't attack when not planted");
    } else {
      this.size -= 1;
      console.log(`plant has been attacked, current size: ${this.size}`);
    }
  }
  harvest() {
    if (!this.hasBeenPlanted) {
      console.log("can't harvest something that hasn't been planted");
    } else {
      // log current plant size, remove all listeners
      console.log(`ur final plant size was ${this.size}`);
      this.removeAllListeners();
    }
  }
}

const plant = new Plant();

console.log("welcome to growing a plant");
console.log("you can enter stuff to grow ur plant");

const run = async () => {
  const answer = await rl.question(
    "enter 'plant seed', 'water', 'attack', 'harvest', or 'exit': "
  );

  if (answer.toLowerCase() === "exit") {
    console.log("exiting...");
    rl.close();
    return;
  } else {
    switch (answer.toLowerCase()) {
      case "plant seed": {
        plant.emit("plantSeed");
        break;
      }
      case "water": {
        plant.emit("water");
        break;
      }
      case "attack": {
        plant.emit("bugAttack");
        break;
      }
      case "harvest": {
        plant.emit("harvest");
        break;
      }
    }
    run();
  }
};

run();
