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


export enum RouteType {
    Start, Transit, Talk, Battle, Store, Info, Ending
}


export abstract class Route {
    abstract routeType: RouteType;
    abstract templatePath: string;
    id: string;
    routes: { [name: string]: Route };
    constructor(routes: { [name: string]: Route }) {
        this.routes = routes;
        //If you're wondering how to name your template, use the first prefix (aka, the path should be relative to the Templates Folder)
        let prefixes = ["./Templates/","./","","./Templates/Public/"];
        let index = 0;
        let result = "";
        while (true) {
            if (index >= prefixes.length) {
                throw "no prefixes were found that contained the specified templatePath.  If you see this error in a non-development version, the apocolypse has probably occurred";
            }
            result = prefixes[index] + this.templatePath;
            if (fs.existsSync(result)) {
                break;
            } else {
                index++;
            }
        }
        this.templatePath = result;
    }
    isValid(name: string) : boolean {
        return name in this.routes;
    }
    getRoute(name: string, callback: (err: Error, html: string) => void): void {
        if (!(name in this.routes)) {
            throw "route name (" + name + ") does not exist in the current context";
        } else {
            let route = this.routes[name];
            fs.readFile(route.templatePath, function (err, data) {
                callback(err, data ? this.buildHtml(data) : null);
            });
        }
    }
    abstract buildHTML(templateHtml: string) : string;
}

export class Talk extends Route {
    routeType: RouteType = RouteType.Talk;
    templatePath: string = "Talk.html";
    speaker: Character;
    constructor(speaker: Character, routes: { [name: string]: Route }) {
        super(routes);
        this.speaker = speaker;
    }
    buildHTML(templateHtml: string) {
        return templateHtml
            .replace("##SPEAKERNAME##", this.speaker.name);
    }
}

export class Intro extends Route {
    templatePath: string = "Intro.html";
    routeType = RouteType.Start;
    constructor(routes: { [name: string]: Route }) {
        super(routes);

    }
    buildHTML(templateHtml: string): string {
        //There are no data-specific activitites here - there is only one intro, so whatever's in the template works great.
        return templateHtml;
    }
}

