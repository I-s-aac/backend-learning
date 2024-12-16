import * as fs from "node:fs/promises";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });
const writingOutputPath = "./stdinFileWritingOutput.txt";

await fs.writeFile(writingOutputPath, "");

const fd = await fs.open(writingOutputPath, "a");
const writeStream = fd.createWriteStream();

/* goal
Create a program that takes input from stdin one line at a time, and writes it to a file using a file system writable stream.
Your program should continue to accept input until the user enters ‘exit’ at which point you should close the stream and exit the process.
*/

rl.on("error", (err) => {
  console.error(`error occurred in rl: ${err}`);
});

rl.on("line", (input) => {
  try {
    if (input.trim().toLowerCase() === "exit") {
      writeStream.end();
      rl.close();
    } else {
      writeStream.write(input + "\n");
    }
  } catch (err) {
    console.error(`an error occurred in rl.on("line"): ${err}`);
  }
});
