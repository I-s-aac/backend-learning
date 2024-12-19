import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
// import data from "./data.json";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 3001;

const data = JSON.parse(fs.readFileSync("data.json", "utf8"));

http
  .createServer((request, response) => {
    response.writeHead(200, { "content-type": "text/json" });
    response.end(JSON.stringify(data));
    /* if (request.url === "/") {
      fs.readFile("index.html", (err, html) => {
        response.writeHead(200, { "content-type": "text/html" });
        response.end(html);
      });
    } else if (request.url.match(/.css$/)) {
      const cssPath = path.join(__dirname, request.url);
      const fileStream = fs.createReadStream(cssPath, "utf8");
      response.writeHead(200, { "content-type": "text/css" });
      fileStream.pipe(response);
    } else if (request.url.match(/.jpeg$/)) {
      const jpegPath = path.join(__dirname, request.url);
      const fileStream = fs.createReadStream(jpegPath);
      response.writeHead(200, { "content-type": "image/jpeg" });
      fileStream.pipe(response);
    } else if (request.url.match(/.png$/)) {
      const pngPath = path.join(__dirname, request.url);
      const fileStream = fs.createReadStream(pngPath);
      response.writeHead(200, { "content-type": "image/png" });
      fileStream.pipe(response);
    } else if (request.url.match(/.jpg$/)) {
      const jpgPath = path.join(__dirname, request.url);
      const fileStream = fs.createReadStream(jpgPath);
      response.writeHead(200, { "content-type": "image/jpg" });
      fileStream.pipe(response);
    } else {
      response.writeHead(404, { "content-type": "text/plain" });
      response.end(`404 file not found`);
    } */
  })
  .listen(port, () => {
    console.log(`listening on port ${port}`);
  });
