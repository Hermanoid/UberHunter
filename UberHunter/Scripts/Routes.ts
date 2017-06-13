/// <reference path="typings/node/node.d.ts" />
import { Character } from "./Characters";
import fs = require("fs");
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



enum RouteType {
    Talk, Battle, Store, Info, Ending
}

abstract class Route {
    abstract routeType: RouteType;
    routes: { [id: string]: Route };
    templatePath: string;
    constructor(routes: { [id: string]: Route }, templatePath: string) {
        this.routes = routes;
        this.templatePath =
            fs.exists(templatePath) ? templatePath :
                fs.exists("../" + templatePath) ? "../" + templatePath :
                    fs.exists("../Templates" + templatePath) ? "../Templates" + templatePath :
                        "../Templates/Public" + templatePath;
        if (!fs.exists(this.templatePath)) { throw "TemplatePath not vaild.  This is an internal error caused by a Route type not providing an existing template.  If this occurs in production, an alien ship probably crashed into an essential server somewhere." };
    }
    isValid(id: string) : boolean {
        return id in this.routes;
    }
    switchTo(id: string, callback: (err: NodeJs.ErrnoException, html: string) => void): void {
        if (!(id in this.routes)) {
            throw "id (" + id + ") does not exist in the current context";
        } else {
            let route = this.routes[id];
            fs.readFile(route.templatePath, function (err, data) {
                callback(err, data ? this.buildHtml(data) : null);
            });
        }
    }
    abstract buildHTML(templateHtml: string) : string;
    abstract start();
}

class Talk extends Route {
    routeType: RouteType = RouteType.Talk;
    speaker: Character;
    constructor(speaker: Character, routes: { [id: string]: Route }) {
        super(routes, "Talk.html", );
        this.speaker = speaker;
    }
    buildHTML(templateHtml: string) {
        return templateHtml
            .replace("##SPEAKERNAME##", this.speaker.name);
    }
    start() {
        let heading = document.getElementById("heading");
        heading.innerHTML = "Yo!";
    }
}

export {
    Route, Talk
}


