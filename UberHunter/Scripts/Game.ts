import { Character, CharacterState } from "./Characters"
import * as Routes from "./Routes"

let fred: string = "Fred's awesome!!!";

var characters: { [name: string]: Character } = {
    "Fred": new Character("Fred", "http://encyclopedia.densho.org/front/media/cache/1b/1e/1b1ea3aa162ea031dc8b7a6903258d6a.jpg", CharacterState.Normal)
}
var RouteTree: Routes.Intro = new Routes.Intro(
    { "fred": new Routes.Talk(characters["Fred"], {}) }
)



var RouteRegister: { [id: string]: Routes.Route } = {}
//Interestingly enough, this design lets anyone with the intro have access to the entire tree, which seems helpful.
//Possible Side Effect:  Endings will be in the Register once per every parent they possess, which could be a lot.
//If Javascript uses references instead of values (I see no reason it wouldn't) that won't be a problem
var ri = 0;
function Flatten(route: Routes.Route) {
    var keys = Object.keys(route.routes);
    for (var ci = 0; ci < keys.length; ci++) {
        ri++;
        RouteRegister[ri] = route.routes[keys[ci]];
        RouteRegister[ri].id = ri.toString();
        if (RouteRegister[ri].routeType !== Routes.RouteType.Ending) {
           Flatten(RouteRegister[ri])
        }
    }
}
RouteRegister[0] = RouteTree; 
Flatten(RouteTree);
console.log(RouteRegister);

export {
    RouteRegister
}