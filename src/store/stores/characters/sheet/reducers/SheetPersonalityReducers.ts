import { Personality } from "../../../../../entities/library/socials/Personality";
import { SheetSavePersonality, SheetAddPersonality, SheetRemovePersonality } from "../actions/SheetPersonalityActions";
import { SheetState } from "../Sheet.State";

const updateSheetPersonalities = (state: SheetState, ...personalities: Personality[]) => ({...state, personalities});

const savePersonality = (state: SheetState, action: SheetSavePersonality): SheetState => {
    const { character, id, instanceId } = action;
    const personality = character.personalities.get(id);
    if (personality == undefined) {
        console.error('Attmepted to save nonexistent personality.');
        return state;
    }

    personality.instanceId = instanceId;
    personality.saved = true;

    return updateSheetPersonalities(state, ...character.personalities);
}

const addPersonality = (state: SheetState, action: SheetAddPersonality): SheetState => {
    const { character, personality } = action;
    if (character.personalities.containsKey(personality.id)) {
        console.error('Attempt to add duplicate personality.');
        return state;
    }

    character.personalities.add(personality);
    return updateSheetPersonalities(state, ...character.personalities);
}

const removePersonality = (state: SheetState, action: SheetRemovePersonality): SheetState => {
    const { character, personalityInstanceId } = action;
    if (!character.personalities.collection.any(personality => personality.instanceId == personalityInstanceId)) {
        console.error('Attempt to remove nonexistent personality.');
        return state;
    }
    const personalities = character.personalities.collection.filter(personality => personality.instanceId != personalityInstanceId);
    return updateSheetPersonalities(state, ...personalities);
}

export const PersonalityActionReducers = {
    savePersonality,
    addPersonality,
    removePersonality,
}