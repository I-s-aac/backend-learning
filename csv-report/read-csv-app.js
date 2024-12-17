import csvp from "csv-parser";
import { createObjectCsvWriter as createCsvWriter } from "csv-writer";
import * as fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const argv = process.argv;

const filePath = path.join(__dirname, "data", "languages.csv");
const outputFilePath = path.join(__dirname, "output.csv");

const mode = argv[2] || "languageSort";

/* argv inputs:
 [2]: mode
 [3]:
  if mode="languageSort": a string ex "french" (will be sanitized lowercase anyway)
  if mode="carByDate": a date, 4 numbers, ex 2020, do listed in TODO
  if mode="carByMake": no input required for argv[3], do listed in TODO
*/

/* TODO
  1: language entereable via process.argv
  2: get number of cars before and after/on some date
  3: interactive, find total number of cars by make
*/

const inputFile = fs.createReadStream(filePath);

let headers = [];
const specificPeople = [];

inputFile
  .pipe(csvp())
  .on("headers", (inputHeaders) => {
    headers = inputHeaders.map((header) => ({ id: header, title: header }));
  })
  .on("data", (data) => {
    if (data.language?.toLowerCase() === "french") {
      specificPeople.push(data);
    }
  })
  .on("end", () => {
    console.log(...headers);
    console.log("csv processed");
    const csvWriter = createCsvWriter({
      path: outputFilePath,
      header: headers,
    });
    csvWriter.writeRecords(specificPeople).then(() => {
      console.log("finished writing");
    });
  });
