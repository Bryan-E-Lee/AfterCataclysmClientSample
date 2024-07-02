import { Character } from "../../../../../entities/characters/Character";
import { Personality } from "../../../../../entities/library/socials/Personality";
import { CharacterActions } from "../../../../../store/stores/collection/characters/CharacterStore.Actions";

export type OptionProps = {
    personality: Personality;
    character: Character;
    actions: typeof CharacterActions;
}