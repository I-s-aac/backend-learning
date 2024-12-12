import { EventEmitter } from "node:events";

// class MyEmitter extends EventEmitter {}
// const emitter = new MyEmitter();

// // error handling for this specific emitter, doing this is best practice to add for any new emitters
// emitter.on("error", (err) => {
//   console.error("an error occured", err);
// });

// // handles errors for the entire program, mostly
// process.on("uncaughtException", (err) => {
//   console.error("an uncaught exception occured: ", err);
// });

// emitter.on("newListener", (thing) => {
//   console.log("a new listener was added: ", thing);
// });

// emitter.on("event1", function (...args) {
//   console.log(args);
// });

// emitter.emit("event1", "a", 1, ["aa"]);

/* good thing to know in some use cases
Event: 'newListener'#
Added in: v0.1.26
eventName <string> | <symbol> The name of the event being listened for
listener <Function> The event handler function

The EventEmitter instance will emit its own 'newListener' event before a listener is added to its internal array of listeners.

Listeners registered for the 'newListener' event are passed the event name and a reference to the listener being added.

The fact that the event is triggered before adding the listener has a subtle but important side effect: any additional listeners registered to the same name within the 'newListener' callback are inserted before the listener that is in the process of being added. 

the code in "newListener" event runs before the original listener is added
the code in "removeListener" event runs after the original listener is removed
*/

// the better way to do it
class Robot extends EventEmitter {
  constructor(name = "bob") {
    super();
    this.name = name;
    this.activated = false;
    this.registerListeners();
  }

  registerListeners() {
    this.on("error", this.errorListener);
    this.once("activate", this.activateListener);
    this.on("speak", this.speakListener);
  }

  errorListener(err) {
    console.error(`${this.name} caused error: ${err}`);
  }
  activateListener() {
    this.activated = true;
  }
  speakListener(text = "") {
    if (this.activated) {
      console.log(`${this.name}: ${text}`);
    }
  }
}

// the worse way to do it (in this case at least)
class Robot2 extends EventEmitter {
  constructor(name) {
    super();
    this.name = name || "jim";
    this.activated = false;
  }
}

const robot = new Robot();
const robot2 = new Robot2("james");

robot2.on("error", function (err) {
  console.log(`error from ${this.name}`);
});
robot2.once("activate", function () {
  this.activated = true;
});
robot2.on("speak", function (string = "") {
  if (this.activated) {
    console.log(`${this.name} said: ${string}`);
  }
});

robot.emit("activate");
robot.emit("activate"); // this call does nothing
robot.emit("activate"); // this call does nothing
robot.emit("speak", "get rekt");

robot2.emit("speak", "hello");
robot2.emit("activate");
robot2.emit("speak", "hello 2");

robot.emit("test");
