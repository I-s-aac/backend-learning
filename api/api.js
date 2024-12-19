const http = require("http");

const data = require("./data/inventory");

http.createServer((req, res) => {
		res.writeHead(200, {"Content-Type": "text/json"});
    res.end(JSON.stringify(data));
}).listen(3000);

console.log("Server listening on port 3000");
