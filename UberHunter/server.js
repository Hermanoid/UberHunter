"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var port = process.env.port || 1337;
http.createServer(function (req, res) {
    var url = new URL(req.url);
    var stage = url.pathname;
}).listen(port);
//# sourceMappingURL=server.js.map