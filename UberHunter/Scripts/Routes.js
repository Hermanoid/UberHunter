"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
//class Greeter {
//    element: HTMLElement;
//    span: HTMLElement;
//    timerToken: number;
//    constructor(element: HTMLElement) {
//        this.element = element;
//        this.element.innerHTML += "The time is: ";
//        this.span = document.createElement('span');
//        this.element.appendChild(this.span);
//        this.span.innerText = new Date().toUTCString();
//    }
//    start() {
//        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
//    }
//    stop() {
//        clearTimeout(this.timerToken);
//    }
//}
//window.onload = () => {
//    var el = document.getElementById('content');
//    var greeter = new Greeter(el);
//    greeter.start();
//};
var RouteType;
(function (RouteType) {
    RouteType[RouteType["Talk"] = 0] = "Talk";
    RouteType[RouteType["Battle"] = 1] = "Battle";
    RouteType[RouteType["Store"] = 2] = "Store";
    RouteType[RouteType["Info"] = 3] = "Info";
    RouteType[RouteType["Ending"] = 4] = "Ending";
})(RouteType || (RouteType = {}));
var Route = (function () {
    function Route(routes, templatePath) {
        this.routes = routes;
        //If you're wondering how to name your template, use the first prefix (aka, the path should be relative to the Templates Folder)
        var prefixes = ["./Templates/", "./", "", "./Templates/Public/"];
        var index = 0;
        var result = "";
        while (true) {
            if (index >= prefixes.length) {
                throw "no prefixes were found that contained the specified templatePath.  If you see this error in a non-development version, the apocolypse has probably occurred";
            }
            result = prefixes[index] + templatePath;
            if (fs.existsSync(result)) {
                break;
            }
            else {
                index++;
            }
        }
        templatePath = result;
    }
    Route.prototype.isValid = function (id) {
        return id in this.routes;
    };
    Route.prototype.getRoute = function (id, callback) {
        if (!(id in this.routes)) {
            throw "id (" + id + ") does not exist in the current context";
        }
        else {
            var route = this.routes[id];
            fs.readFile(route.templatePath, function (err, data) {
                callback(err, data ? this.buildHtml(data) : null);
            });
        }
    };
    return Route;
}());
exports.Route = Route;
var Talk = (function (_super) {
    __extends(Talk, _super);
    function Talk(speaker, routes) {
        var _this = _super.call(this, routes, "Talk.html") || this;
        _this.routeType = RouteType.Talk;
        _this.speaker = speaker;
        return _this;
    }
    Talk.prototype.buildHTML = function (templateHtml) {
        return templateHtml
            .replace("##SPEAKERNAME##", this.speaker.name);
    };
    Talk.prototype.start = function () {
        var heading = document.getElementById("heading");
        heading.innerHTML = "Yo!";
    };
    return Talk;
}(Route));
exports.Talk = Talk;
//# sourceMappingURL=Routes.js.map