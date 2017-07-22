"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CharacterState;
(function (CharacterState) {
    CharacterState[CharacterState["Normal"] = 0] = "Normal";
    CharacterState[CharacterState["Sad"] = 1] = "Sad";
    CharacterState[CharacterState["Depressed"] = 2] = "Depressed";
    CharacterState[CharacterState["Excited"] = 3] = "Excited";
    CharacterState[CharacterState["Unhappy"] = 4] = "Unhappy";
    CharacterState[CharacterState["Angry"] = 5] = "Angry";
    CharacterState[CharacterState["Furious"] = 6] = "Furious";
    CharacterState[CharacterState["Bloodthirsty"] = 7] = "Bloodthirsty";
    CharacterState[CharacterState["Content"] = 8] = "Content";
    CharacterState[CharacterState["Disgusted"] = 9] = "Disgusted";
    CharacterState[CharacterState["Loathful"] = 10] = "Loathful";
    CharacterState[CharacterState["Fearful"] = 11] = "Fearful";
    CharacterState[CharacterState["Amazed"] = 12] = "Amazed";
})(CharacterState || (CharacterState = {}));
exports.CharacterState = CharacterState;
var Character = (function () {
    function Character(name, picUrl, startingState) {
        this.name = name;
        this.picUrl = picUrl;
        this.state = startingState;
    }
    return Character;
}());
exports.Character = Character;
//# sourceMappingURL=Characters.js.map