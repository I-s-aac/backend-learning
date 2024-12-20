const openpgp = require("openpgp");
const fs = require("fs");

const privateKeyArmored = fs.readFileSync("./private.key");
const passphrase = "orange juice tastes good";

(async () => {
  const privateKey = await openpgp.decryptKey({
    privateKey: await openpgp.readPrivateKey({
      armoredKey: privateKeyArmored.toString(),
    }),
    passphrase,
  });
  const encryptedData = fs.readFileSync("encrypted-secret.txt");

  const decryped = await openpgp.decrypt({
    message: await openpgp.readMessage({ armoredMessage: encryptedData.toString() }),
    decryptionKeys: [privateKey],
  });
  console.log("decrypted data");
  console.log(decryped.data);
})();
