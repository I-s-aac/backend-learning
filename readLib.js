import * as fs from "node:fs/promises";

/* goal: 
 Combine fs.readdir, fs.stat, and fs.readFile to console.log() the contents of all files within the /lib directory.
 All subdirectories should be ignored.
*/

const doStuff = async () => {
  try {
    const files = await fs.readdir("lib", { withFileTypes: true });

    for (let i = 0; i < files.length; i++) {
      // const fileName = files[i];
      // const isFile = (await fs.stat(`lib/${fileName}`)).isFile();
      // if (isFile) {
      //   const details = await fs.readFile(`lib/${fileName}`, {
      //     encoding: "utf8",
      //   });
      //   console.log(details);
      //   console.log("line separator");
      // }
      const file = files[i];
      if (file.isFile()) {
        const details = await fs.readFile(`${file.parentPath}/${file.name}`, {
          encoding: "utf8",
        });

        console.log(details);
        console.log("line separator");
      }
    }
  } catch (err) {
    console.error(err);
  }
};
doStuff();
