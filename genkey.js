const openpgp = require("openpgp");
const fs = require("fs");

generate();
async function generate() {
  const { privateKey, publicKey } = await openpgp.generateKey({
    type: "ecc", // curve: "curve25519"
    curve: "curve25519", // rsaBits: 4096
    userIDs: [{ name: "zazu", email: "zazu@email.com" }],
    passphrase: "orange juice tastes good",
    format: "armored", // output key format, defaults to "armored"
  });
  fs.writeFileSync("./private.key", privateKey);
  fs.writeFileSync("./public.key", publicKey);
  console.log("keys generated and written");
}
