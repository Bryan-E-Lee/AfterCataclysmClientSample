import { Action, Reducer } from "redux";
import { CharacterInitializer } from "../../../../entities/characters/Character";
import { SortedSet } from "../../../../entities/data-structures/SortedSet";
import { CharacterAction } from "./CharacterStore.Actions";
import { CharacterDefaultState, CharacterState } from "./CharacterStore.State";

export const CharacterReducer: Reducer<CharacterState> = (
    state: CharacterState | undefined,
    incomingAction: Action
): CharacterState => {
    if (state == undefined) {
        return CharacterDefaultState;
    }
    const action = incomingAction as CharacterAction;
    const characters: SortedSet<CharacterInitializer> = new SortedSet(state.characters.map(c => {
        const { deleting, ...character } = { ...c };
        return character;
    }));
    switch (action.type) {
        case 'CHARACTERS_LOADED':
            return { ...state, loaded: true, characters: ConvertToDeletableCharacters(new SortedSet(action.characters)) };
        case 'CHARACTER_ADD_NEW':
            characters.add(action.character);
            return { ...state, characters: ConvertToDeletableCharacters(characters) };
        case 'CHARACTER_UPDATED':
            characters.update(action.character);
            return { ...state, characters: ConvertToDeletableCharacters(characters) };
        case 'CHARACTER_DELETING':
            return { ...state, characters: state.characters.map(c => ({ ...c, deleting: c.id == action.id ? !action.undo : c.deleting })) };
        case 'CHARACTER_DELETED':
            return { ...state, characters: state.characters.filter(c => c.id != action.id) }

        default:
            return { ...state };
    }
};

const ConvertToDeletableCharacters = (characters: SortedSet<CharacterInitializer>, deleting = false) => characters.collection.map(c => ({ ...c, deleting }));