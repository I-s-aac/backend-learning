import * as fs from "node:fs/promises";

/* indexes of inputs
  [2]: the word to replace
  [3]: the string to overwrite the word
  [4]: output filename
  [5]: input filename
*/

/* to get the result from exercise, run:
node replaceWordXWithYOutputToZFromA.js bacon tasty newBacon.txt bacon.txt
*/

const doStuff = async () => {
  try {
    const replaceWord = process.argv[2];
    const replaceWith = process.argv[3];
    const outputFilePath = process.argv[4];
    const inputFilePath = process.argv[5];

    if (
      replaceWord &&
      replaceWith &&
      outputFilePath &&
      inputFilePath &&
      inputFilePath !== outputFilePath
    ) {
      const input = await fs.readFile(inputFilePath, { encoding: "utf8" });
      const regex = new RegExp(`\\b${replaceWord}\\b`, "gi");
      const count = input.match(regex).length;
      const newString = input.replaceAll(regex, replaceWith);
      await fs.writeFile(outputFilePath, newString);
      console.log(
        `"${replaceWord}" was found and replaced with "${replaceWith}" ${count} times`
      );
    }
  } catch (err) {
    console.error(err);
  }
};

doStuff();
