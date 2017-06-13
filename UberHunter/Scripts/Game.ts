import { Character, CharacterState } from "./Characters";
import Routes = require("./Routes");

let fred: string = "Fred's awesome!!!";

var currentRoute: Routes.Route;
var characters: { [name: string]: Character } = {
    "Fred": new Character("Fred", "http://encyclopedia.densho.org/front/media/cache/1b/1e/1b1ea3aa162ea031dc8b7a6903258d6a.jpg", CharacterState.Normal)
}
var routes: { [id: string]: Routes.Route } = {
    "fred": new Routes.Talk(characters["Fred"], {})
}
class Game {
    fred: string;
}
export {
    Game
};