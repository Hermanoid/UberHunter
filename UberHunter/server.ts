/// <reference path="Scripts/Game.ts" />
import http = require('http');
import url = require("url");
import fs = require("fs");
import { Game } from "./Scripts/Game";

Game
window.fred

var port = process.env.port || 1337
http.createServer(function (req, res) {
    let url = new URL(req.url);
    let chunks = url.pathname.split('/');
    if (chunks.length == 0) {
        chunks = ["Routes", "Index"];
    } else if (chunks.length == 1) {
        if (chunks[0] == "Routes") {
            chunks.push("Index");
        } else {
            res.writeHead(404, "URL does not contain enough information (example:  '<resource_type>/<resource>'.  For home page, navigate to '/').");
            res.end();
        }
    } else {
        switch (chunks[0].toLowerCase()) {
            case "scripts":
                let scriptPath = "./Scripts/Public/" + chunks[1];
                if (fs.exists(scriptPath)) {
                    res.writeHead(200, { contentType: "text/javascript" });
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
                if (chunks[1] in Game.currentRoute.routes) {
                    currentRoute.switchTo(newRoute);
                } else {
                    res.writeHead(404, "The requested route does not exist in the current context.");
                    res.end();
                }
            default:
                res.writeHead(404, "Resource Type not found ('/<resource_type>/<resource>')");
                res.end();
        }
        
    }
}).listen(port);