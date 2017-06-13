enum CharacterState {
    Normal, Sad, Depressed, Excited, Unhappy, Angry, Furious, Bloodthirsty, Content, Disgusted, Loathful, Fearful, Amazed
}

class Character {
    name: string;
    picUrl: string;
    state: CharacterState;
    constructor(name: string, picUrl: string, startingState: CharacterState) {
        this.name = name;
        this.picUrl = picUrl;
        this.state = startingState;
    }
}

export {
    Character, CharacterState
}