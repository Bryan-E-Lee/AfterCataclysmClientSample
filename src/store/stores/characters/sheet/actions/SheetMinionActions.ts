import { Character } from "../../../../../entities/characters/Character";
import { Minion, MinionInitializer, OwnedMinionInitializer } from "../../../../../entities/library/minions/Minion";
import { ErrorToast, SuccessToast } from "../../../../../entities/toasts/Toasts";
import { getUniqueIdentifier } from "../../../../../utils/GUID";
import { AppThunkAction } from "../../../ApplicationState";
import { ToastAction, ToastDispatchables } from "../../../toasts/Toasts.Actions";

export type SheetSaveMinion = { type: 'SHEET_SAVE_MINION', character: Character, oldInstanceId: string, newInstanceId: string }
export type SheetUpdateMinion = { type: 'SHEET_UPDATE_MINION', character: Character, minion: OwnedMinionInitializer }
export type SheetAddMinion = { type: 'SHEET_ADD_MINION', character: Character, minion: OwnedMinionInitializer }
export type SheetRemoveMinion = { type: 'SHEET_REMOVE_MINION', character: Character, minionInstanceId: string }

export type SheetMinionAction = SheetSaveMinion
    | SheetUpdateMinion
    | SheetAddMinion
    | SheetRemoveMinion;

export const SheetMinionActions = {
    updateMinionHealth: (character: Character, minion: OwnedMinionInitializer, newHealth: number): AppThunkAction<SheetMinionAction | ToastAction> =>
        async (dispatch, getState) => {
            const characterApi = getState().api.characters;

            const oldVersion = { ...minion };
            const newVersion = { ...minion, currentHealth: newHealth };

            const undo = () => {
                dispatch({ type: 'SHEET_UPDATE_MINION', character, minion: oldVersion });
                ToastDispatchables.toast(new ErrorToast('Error updating minion health.'), dispatch);
            }
            dispatch({ type: 'SHEET_UPDATE_MINION', character, minion: newVersion });

            try {
                const response = await characterApi.updateMinion(character.id, oldVersion, newVersion);
                if (response.status == 'Error') {
                    undo();
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
            }
            catch (e) {
                undo();
                console.error(e);
            }
        },

    addMinion: (character: Character, minion: MinionInitializer): AppThunkAction<SheetMinionAction | ToastAction> =>
        async (dispatch, getState) => {
            const characterApi = getState().api.characters;
            const instanceId = getUniqueIdentifier();
            const commandSkill = character.skills.collection.find(s => s.name == 'Command');
            if (commandSkill == null) {
                ToastDispatchables.toast(new ErrorToast('Command skill not found!'), dispatch);
                return;
            }

            const currentHealth = minion.baseHealth + commandSkill.level * minion.healthScale;
            const placeholder = { ...minion, instanceId, currentHealth, saved: false };

            const undo = () => {
                dispatch({ type: 'SHEET_REMOVE_MINION', character, minionInstanceId: instanceId });
                ToastDispatchables.toast(new ErrorToast('Error adding minion.'), dispatch);
            }
            dispatch({ type: 'SHEET_ADD_MINION', character, minion: placeholder });

            try {
                const response = await characterApi.addMinion(character.id, minion.id);
                if (response.status == 'Success') {
                    dispatch({ type: 'SHEET_SAVE_MINION', character, newInstanceId: response.payload, oldInstanceId: instanceId });
                    ToastDispatchables.toast(new SuccessToast(`${minion.name} recruited.`), dispatch);
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

    removeMinion: (character: Character, minion: Minion): AppThunkAction<SheetMinionAction | ToastAction> =>
        async (dispatch, getState) => {
            const characterApi = getState().api.characters;
            const undo = () => {
                dispatch({ type: 'SHEET_ADD_MINION', character, minion });
                ToastDispatchables.toast(new ErrorToast('Error removing minion.'), dispatch);
            }
            dispatch({ type: 'SHEET_REMOVE_MINION', character, minionInstanceId: minion.instanceId });

            try {
                const response = await characterApi.removeMinion(character.id, minion.instanceId);
                if (response.status == 'Error') {
                    undo();
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
                else {
                    ToastDispatchables.toast(new SuccessToast(`${minion.displayName} removed.`), dispatch);
                }
            }
            catch (e) {
                undo();
                console.error(e);
            }
        },

    updateMinionCustomName: (character: Character, minion: Minion, newCustomName: string | undefined): AppThunkAction<SheetMinionAction | ToastAction> =>
        async (dispatch, getState) => {
            const characterApi = getState().api.characters;
            const oldVersion = { ...minion };
            const newVersion = { ...minion, customName: newCustomName };
            const undo = () => {
                dispatch({ type: 'SHEET_UPDATE_MINION', character, minion: oldVersion });
                ToastDispatchables.toast(new ErrorToast('Error updating minion name.'), dispatch);
            }
            dispatch({ type: 'SHEET_UPDATE_MINION', character, minion: newVersion });
            try {
                const response = await characterApi.updateMinion(character.id, oldVersion, newVersion);
                if (response.status == 'Error') {
                    undo();
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
            }
            catch (e) {
                undo();
                console.error(e);
            }
        },

    updateMinionCustomNotes: (character: Character, minion: Minion, newCustomNotes: string | undefined): AppThunkAction<SheetMinionAction | ToastAction> =>
        async (dispatch, getState) => {
            const characterApi = getState().api.characters;
            const oldVersion = { ...minion };
            const newVersion = { ...minion, customNotes: newCustomNotes };
            const undo = () => {
                dispatch({ type: 'SHEET_UPDATE_MINION', character, minion: oldVersion });
                ToastDispatchables.toast(new ErrorToast('Error updating minion notes.'), dispatch);
            }
            dispatch({ type: 'SHEET_UPDATE_MINION', character, minion: newVersion });
            try {
                const response = await characterApi.updateMinion(character.id, oldVersion, newVersion);
                if (response.status == 'Error') {
                    undo();
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
            }
            catch (e) {
                undo();
                console.error(e);
            }
        }
}