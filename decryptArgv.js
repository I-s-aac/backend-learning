const openpgp = require("openpgp");
const fs = require("fs");

const privateKeyPath = process.argv[2];
const encryptedPath = process.argv[3];

if (privateKeyPath && encryptedPath) {
  const privateKeyArmored = fs.readFileSync(privateKeyPath);
  const passphrase = "orange juice tastes good";

  (async () => {
    const privateKey = await openpgp.decryptKey({
      privateKey: await openpgp.readPrivateKey({
        armoredKey: privateKeyArmored.toString(),
      }),
      passphrase,
    });
    const encryptedData = fs.readFileSync(encryptedPath);

    const decryped = await openpgp.decrypt({
      message: await openpgp.readMessage({
        armoredMessage: encryptedData.toString(),
      }),
      decryptionKeys: [privateKey],
    });
    console.log("decrypted data");
    console.log(decryped.data);
  })();
} else {
  console.log("bad arguments, use <private key path> <file to decrypt path>");
}
