import { Character } from "../../../../../entities/characters/Character";
import { Rhetoric, RhetoricPriority } from "../../../../../entities/library/socials/Rhetoric";
import { ErrorToast } from "../../../../../entities/toasts/Toasts";
import { AppThunkAction } from "../../../ApplicationState";
import { ToastAction, ToastDispatchables } from "../../../toasts/Toasts.Actions";

export type SheetSaveRhetoric = { type: 'SHEET_SAVE_RHETORIC', character: Character, rhetoricId: string }
export type SheetUpdateRhetoric = { type: 'SHEET_UPDATE_RHETORIC_PRIORITY', character: Character, rhetoricId: string, priority: RhetoricPriority };
export type SheetAdjustRhetoric = { type: 'SHEET_ADJUST_RHETORIC', character: Character, rhetoricId: string, adjustment: number };
export type SheetOverrideRhetoric = { type: 'SHEET_OVERRIDE_RHETORIC', character: Character, rhetoricId: string, override?: number };

export type SheetRhetoricAction = SheetSaveRhetoric
    | SheetUpdateRhetoric
    | SheetAdjustRhetoric
    | SheetOverrideRhetoric;

export const SheetRhetoricActions = {
    updateRhetoricPriority: (character: Character, rhetoric: Rhetoric, priority: RhetoricPriority): AppThunkAction<SheetRhetoricAction | ToastAction> =>
        async (dispatch, getState) => {
            const { api: { characters: characterApi } } = getState();

            const matchingPriorityRhetorics = character.rhetorics.collection.filter(r => r.id != rhetoric.id && r.priority == priority);

            const oldPriority = rhetoric.priority;
            
            const oldMatchVersions = matchingPriorityRhetorics.map(mpr => ({ ...mpr }));
            const newMatchVersions = matchingPriorityRhetorics.map(mpr => ({ ...mpr, priority: oldPriority }));

            const undo = () => {
                dispatch({ type: 'SHEET_UPDATE_RHETORIC_PRIORITY', character, rhetoricId: rhetoric.id, priority: oldPriority });
                for (let oldMatch of oldMatchVersions) {
                    dispatch({ type: 'SHEET_UPDATE_RHETORIC_PRIORITY', character, rhetoricId: oldMatch.id, priority: oldMatch.priority });
                }
                ToastDispatchables.toast(new ErrorToast(`Error updating ${rhetoric.name}.`), dispatch);
            }
            dispatch({ type: 'SHEET_UPDATE_RHETORIC_PRIORITY', character, rhetoricId: rhetoric.id, priority });
            for (let newMatch of newMatchVersions) {
                dispatch({ type: 'SHEET_UPDATE_RHETORIC_PRIORITY', character, rhetoricId: newMatch.id, priority: newMatch.priority });
            }

            try {
                const response = await characterApi.updateRhetoricPriority(character.id, rhetoric.id, priority);
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

    adjustRhetoric: (character: Character, rhetoric: Rhetoric, adjustment: number): AppThunkAction<SheetRhetoricAction | ToastAction> =>
        async (dispatch, getState) => {
            const { api: { characters: characterApi } } = getState();

            const oldVersion = { ...rhetoric };
            const newVersion = { ...rhetoric, adjustment };

            const undo = () => {
                dispatch({ type: 'SHEET_ADJUST_RHETORIC', character, rhetoricId: rhetoric.id, adjustment: oldVersion.adjustment });
                ToastDispatchables.toast(new ErrorToast(`Error adjusting ${rhetoric.name}.`), dispatch);
            }

            try {
                const response = await characterApi.updateRhetoric(character.id, oldVersion, newVersion);
                if (response.status == 'Error') {
                    undo();
                }
            }
            catch (e) {
                undo();
                console.error(e);
            }
        },

    overrideRhetoric: (character: Character, rhetoric: Rhetoric, override: number | undefined): AppThunkAction<SheetRhetoricAction | ToastAction> =>
        async (dispatch, getState) => {
            const { api: { characters: characterApi } } = getState();

            const oldVersion = { ...rhetoric };
            const newVersion = { ...rhetoric, override };

            const undo = () => {
                dispatch({ type: 'SHEET_OVERRIDE_RHETORIC', character, rhetoricId: rhetoric.id, override });
                ToastDispatchables.toast(new ErrorToast(`Server error overriding ${rhetoric.name}.`), dispatch);
            }

            try {
                const response = await characterApi.updateRhetoric(character.id, oldVersion, newVersion);
                if (response.status == 'Error') {
                    undo();
                }
            }
            catch (e) {
                undo();
                console.error(e);
            }
        }
}