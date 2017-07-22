import http = require('http');
import URL = require("url");
import fs = require("fs");
import { RouteRegister } from "./Scripts/Game";

var port = process.env.port || 1337
http.createServer(function (req, res) {

    let chunks = req.url.split('/');
    if (chunks[0] === "") {
        chunks.shift();
    }
    if (chunks.length == 0) {
        chunks = ["Routes", "Index"];
    } else if (chunks.length == 1) {
        if (chunks[0] == "Routes") {
            chunks.push("Index");
        } else {
            res.writeHead(404, "URL does not contain enough information (example:  '<resource_type>/<resource>'.  For home page, navigate to '/').");
            res.end();
            return;
        }
    }
    switch (chunks[0].toLowerCase()) {
        case "scripts":
            let scriptPath = "./Scripts/Public/" + chunks[1];
            if (fs.exists(scriptPath)) {
                res.writeHead(200, { "Content-Type": "text/javascript" });
                fs.readFile(scriptPath, function (err, data) {
                    //I'm pretty sure readFile won't chunk, but if it does, we covered.
                    res.write(data);
                });
                res.end();
            } else {
                res.writeHead(404, "Script '" + chunks[1] + "' not found");
                res.end();
            }
            break;
        case "routes":
            if (chunks[1] in RouteRegister) {
                .getRoute(chunks[1], function (err, html) {
                    res.writeHead(200, { "Content-Type": "text/html", "X-Im-Awesome": "True" })
                    res.end(html, "UTF-8", function (err: Error) {
                        console.log("I DONE RESPONDEDED!!  route ID:  " + chunks[1] + "  error:  " + err.message)
                    });
                });
            } else {
                res.writeHead(404, "The requested route does not exist in the current context.");
                res.end();
            }
        default:
            res.writeHead(404, "Resource Type not found (required format:  '/<resource_type>/<resource>')");
            res.end();
    }
}).listen(port);