"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Characters_1 = require("./Characters");
var Routes = require("./Routes");
var Game;
(function (Game) {
    var currentRoute;
    var characters = {
        "Fred": new Characters_1.Character("Fred", "http://encyclopedia.densho.org/front/media/cache/1b/1e/1b1ea3aa162ea031dc8b7a6903258d6a.jpg", Characters_1.CharacterState.Normal)
    };
    var routes = {
        "fred": new Routes.Talk(characters["Fred"], {})
    };
})(Game || (Game = {}));
exports.Game = Game;
var fred = "fejhsfdl";
//# sourceMappingURL=Game.js.map