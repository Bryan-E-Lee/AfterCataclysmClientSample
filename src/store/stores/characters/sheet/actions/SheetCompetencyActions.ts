import { Character } from "../../../../../entities/characters/Character";
import { Competency, CompetencyInitializer } from "../../../../../entities/characters/Competencies";
import { ErrorToast, SuccessToast } from "../../../../../entities/toasts/Toasts";
import { AppThunkAction } from "../../../ApplicationState";
import { ToastAction, ToastDispatchables } from "../../../toasts/Toasts.Actions";

export type SheetAddCompetency = { type: 'SHEET_ADD_COMPETENCY', character: Character, competency: Competency }
export type SheetAddCustomCompetency = { type: 'SHEET_ADD_CUSTOM_COMPETENCY', competency: Competency }
export type SheetRemoveCompetency = { type: 'SHEET_REMOVE_COMPETENCY', character: Character, id: string }
export type SheetSetCompetencyLevel = { type: 'SHEET_SET_COMPTENCY_LEVEL', character: Character, id: string, isExpert: boolean }
export type SheetSaveCompetency = { type: 'SHEET_SAVE_COMPETENCY', characterId: string, competencyId: string }
export type SheetSaveCustomCompetency = { type: 'SHEET_SAVE_CUSTOM_COMPETENCY', characterId: string, oldCompetencyId: string, newCompetencyId: string }

export type SheetCompetencyAction = SheetAddCompetency
    | SheetAddCustomCompetency
    | SheetRemoveCompetency
    | SheetSetCompetencyLevel
    | SheetSaveCompetency
    | SheetSaveCustomCompetency;

export const SheetCompetencyActions = {
    addCompetency: (character: Character, competencyInitializer: CompetencyInitializer): AppThunkAction<SheetCompetencyAction | ToastAction> =>
        async (dispatch, getState) => {
            const characterApi = getState().api.characters;
            const undo = () => {
                dispatch({ type: 'SHEET_REMOVE_COMPETENCY', character, id: competencyInitializer.id });
                ToastDispatchables.toast(new ErrorToast(`Error adding ${competencyInitializer.name}.`), dispatch);
            }

            const competency: Competency = {
                ...competencyInitializer,
                isExpert: false,
                saved: false
            }
            dispatch({ type: 'SHEET_ADD_COMPETENCY', character, competency });

            try {
                const response = await characterApi.addCompetency(character.id, competencyInitializer.id);
                if (response.status == 'Error') {
                    undo();
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                    return;
                }
                dispatch({ type: 'SHEET_SAVE_COMPETENCY', characterId: character.id, competencyId: competencyInitializer.id });
                ToastDispatchables.toast(new SuccessToast(`${competency.name} added.`), dispatch);
            }
            catch (e) {
                undo();
                console.error(e);
            }
        },

    addCustomCompetency: (character: Character, competency: Competency): AppThunkAction<SheetCompetencyAction | ToastAction> =>
        async (dispatch, getState) => {
            const characterApi = getState().api.characters;
            const undo = () => {
                dispatch({ type: 'SHEET_REMOVE_COMPETENCY', character, id: competency.id });
                ToastDispatchables.toast(new ErrorToast(`Error adding ${competency.name}.`), dispatch);
            }

            dispatch({ type: 'SHEET_ADD_CUSTOM_COMPETENCY', competency: { ...competency, saved: false } });
            try {
                const response = await characterApi.addCustomCompetency(character.id, competency);
                if (response.status == 'Error') {
                    undo();
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                    return;
                }
                dispatch({ type: 'SHEET_SAVE_CUSTOM_COMPETENCY', characterId: character.id, oldCompetencyId: competency.id, newCompetencyId: response.payload });
                ToastDispatchables.toast(new SuccessToast(`${competency.name} added.`), dispatch);
            }
            catch (e) {
                undo();
                console.error(e);
            }
        },

    removeCompetency: (character: Character, competency: Competency): AppThunkAction<SheetCompetencyAction | ToastAction> =>
        async (dispatch, getState) => {
            const characterApi = getState().api.characters;
            const undo = () => {
                if (character.customCompetencies.get(competency.id) != null) {
                    dispatch({ type: 'SHEET_ADD_CUSTOM_COMPETENCY', competency });
                }
                else {
                    dispatch({ type: 'SHEET_ADD_COMPETENCY', character, competency });
                }
                ToastDispatchables.toast(new ErrorToast(`Error removing ${competency.name}.`), dispatch);
            }

            dispatch({ type: 'SHEET_REMOVE_COMPETENCY', character, id: competency.id });

            try {
                const response = await characterApi.removeCompetency(character.id, competency.id);
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

    updateCompetencyLevel: (character: Character, competency: Competency, isExpert: boolean): AppThunkAction<SheetCompetencyAction | ToastAction> =>
        async (dispatch, getState) => {
            const characterApi = getState().api.characters;
            const undo = () => {
                dispatch({ type: 'SHEET_SET_COMPTENCY_LEVEL', character, id: competency.id, isExpert: competency.isExpert });
                ToastDispatchables.toast(new ErrorToast(`Error updating ${competency.name}.`), dispatch);
            }

            dispatch({ type: 'SHEET_SET_COMPTENCY_LEVEL', character, id: competency.id, isExpert });

            try {
                const response = await characterApi.updateCompetency(character.id, competency, { ...competency, isExpert });
                if (response.status == 'Error') {
                    undo();
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
                else {
                    dispatch({ type: 'SHEET_SAVE_COMPETENCY', characterId: character.id, competencyId: competency.id });
                }
            }
            catch (e) {
                undo();
                console.error(e);
            }
        }
}