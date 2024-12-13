import * as fs from "node:fs";

const file = fs.createWriteStream("longFile.txt");

for (let i = 0; i < 10000; i++) {
  file.write(`line number ${i + 1}\n`);
}
file.end();

