const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const inputFilename = "input.enc";
const outputFilename = "input.out";

const algorithm = "aes-256-cbc";
const password = "this is a password";

const key = crypto.scryptSync(password, "salt", 32);
const iv = Buffer.alloc(16, 0);

const inputFilePath = path.join(__dirname, inputFilename);
const outputFilePath = path.join(__dirname, outputFilename);

const encryptFile = (inputPath, outputPath) => {
  const readStream = fs.createReadStream(inputPath);
  const writeStream = fs.createWriteStream(outputPath);
  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  readStream.pipe(decipher).pipe(writeStream);
};

encryptFile(inputFilePath, outputFilePath);
