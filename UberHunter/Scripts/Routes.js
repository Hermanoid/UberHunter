//class Greeter {
//    element: HTMLElement;
//    span: HTMLElement;
//    timerToken: number;
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
        this.templatePath = templatePath;
    }
    Route.prototype.switchTo = function (id) {
        if (!(id in routes)) {
            var s = document.createElement("span");
            s.innerHTML = "Requested game Route (" + id + ") does not exist!!";
            document.appendChild(s);
        }
        else {
            var route = routes["id"];
        }
    };
    return Route;
}());
var Talk = (function (_super) {
    __extends(Talk, _super);
    function Talk(speaker, routes) {
        var _this = _super.call(this, routes, "/Talk.html") || this;
        _this.routeType = RouteType.Talk;
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
//# sourceMappingURL=Routes.js.map