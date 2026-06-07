import { EventEmitter } from "events";

const myEmitter = new EventEmitter();

function greetHandler(name) {
  console.log("Hello " + name);
}

function goodbyeHandler(name) {
  console.log("Goodbye " + name);
}

// Register event listeners
myEmitter.on("greet", greetHandler);
myEmitter.on("goodbye", goodbyeHandler);

//Emit events

myEmitter.emit("greet", "john");
myEmitter.emit("goodbye", "john");

//ErrorHandling

myEmitter.on("error", (err) => {
  console.log("An error occurred:", err);
});

myEmitter.emit("error", new Error("Something went wrong"));
