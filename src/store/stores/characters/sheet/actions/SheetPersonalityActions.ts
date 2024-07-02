import { Character } from "../../../../../entities/characters/Character";
import { OwnedPersonalityInitializer, Personality, PersonalityInitializer } from "../../../../../entities/library/socials/Personality";
import { ErrorToast, InfoToast } from "../../../../../entities/toasts/Toasts";
import { getUniqueIdentifier } from "../../../../../utils/GUID";
import { AppThunkAction } from "../../../ApplicationState";
import { ToastAction, ToastDispatchables } from "../../../toasts/Toasts.Actions";

export type SheetSavePersonality = { type: 'SHEET_SAVE_PERSONALITY', character: Character, id: string, instanceId: string }
export type SheetAddPersonality = { type: 'SHEET_ADD_PERSONALITY', character: Character, personality: OwnedPersonalityInitializer };
export type SheetRemovePersonality = { type: 'SHEET_REMOVE_PERSONALITY', character: Character, personalityInstanceId: string };

export type SheetPersonalityAction = SheetSavePersonality | SheetAddPersonality | SheetRemovePersonality;

export const SheetPersonalityActions = {
    addPersonality: (character: Character, personality: PersonalityInitializer): AppThunkAction<SheetPersonalityAction | ToastAction> =>
        async (dispatch, getState) => {
            const characterApi = getState().api.characters;
            const instanceId = getUniqueIdentifier();
            const placeholder = { ...personality, instanceId, saved: false };

            const undo = () => {
                dispatch({ type: 'SHEET_REMOVE_PERSONALITY', character, personalityInstanceId: instanceId });
                ToastDispatchables.toast(new ErrorToast(`Error adding ${personality.name}.`), dispatch);
            }
            dispatch({ type: 'SHEET_ADD_PERSONALITY', character, personality: placeholder });

            try {
                const response = await characterApi.addPersonality(character.id, personality.id);
                if (response.status == 'Success') {
                    dispatch({ type: 'SHEET_SAVE_PERSONALITY', character, id: personality.id, instanceId: response.payload });
                    ToastDispatchables.toast(new InfoToast(`${personality.name} added.`), dispatch);
                }
                else {
                    undo();
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
            }
            catch (e) {
                undo();
                console.error(e);
            }
        },

    removePersonality: (character: Character, personality: Personality): AppThunkAction<SheetPersonalityAction | ToastAction> =>
        async (dispatch, getState) => {
            const characterApi = getState().api.characters;
            const undo = () => {
                dispatch({ type: 'SHEET_ADD_PERSONALITY', character, personality });
                ToastDispatchables.toast(new ErrorToast(`Error removing ${personality.name}.`), dispatch);
            }
            dispatch({ type: 'SHEET_REMOVE_PERSONALITY', character, personalityInstanceId: personality.instanceId });

            try {
                const response = await characterApi.removePersonality(character.id, personality.id);
                if (response.status == 'Success') {
                    ToastDispatchables.toast(new InfoToast(`${personality.name} removed.`), dispatch);
                }
                else {
                    undo();
                }
            }
            catch (e) {
                undo();
                console.error(e);
            }
        }
}