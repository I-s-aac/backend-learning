const openpgp = require("openpgp");
const fs = require("fs");

const publicKeyPath = process.argv[2];
const encryptedPath = process.argv[3];

if (publicKeyPath && encryptedPath) {

const publicKeyArmored = fs.readFileSync(publicKeyPath);

// auto called function
(async () => {
  const plainData = fs.readFileSync("secret.txt");
  const encrypted = await openpgp.encrypt({
    message: await openpgp.createMessage({ text: plainData.toString() }),
    encryptionKeys: await openpgp.readKey({
      armoredKey: publicKeyArmored.toString(),
    }),
  });

  fs.writeFileSync(encryptedPath, encrypted);
  console.log("data encrypted");
})();
} else {
  console.log("bad arguments, use <public key path> <encrypted output file name>")
}