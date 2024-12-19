import path from "node:path";
import https from "node:https";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const options = {
//   hostname: "nodejs.org",
//   port: 443,
//   path: "/docs/latest/api/",
//   method: "GET",
// };

const options = {
  hostname: "en.wikipedia.org",
  port: 443,
  path: "/wiki/George_Washington",
  method: "GET",
};

const request = https
  .request(options, (response) => {
    let responseBody = "";

    console.log(`server status code ${response.statusCode}`);
    console.log(`server headers:`, response.headers);

    response.setEncoding("utf8");

    response.once("data", (chunk) => {
      console.log(chunk);
    });

    response.on("data", (chunk) => {
      console.log(`chunk length: ${chunk.length}`);
      responseBody += chunk;
    });

    response.on("end", () => {
      fs.writeFile(
        "cachedRequest.html",
        responseBody,
        { encoding: "utf8" },
        () => {
          console.log("file downloaded");
        }
      );
    });

    response.on("error", (err) => {
      console.error("problem with request or something: ", err);
    });
  })
  .end(() => {
    console.log("request ended");
  });
