import { CharacterInitializer } from "../../../../entities/characters/Character";

export interface CharacterState {
    loaded: boolean;
    characters: (CharacterInitializer & { deleting: boolean })[];
    otherPlayerCharacters: CharacterInitializer[];
}

export const CharacterDefaultState: CharacterState = {
    loaded: false,
    characters: [],
    otherPlayerCharacters: [],
};