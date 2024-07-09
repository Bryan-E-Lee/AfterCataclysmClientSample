import { Character } from "../../../../../entities/characters/Character";
import { Condition } from "../../../../../entities/characters/Conditions";
import { ErrorToast } from "../../../../../entities/toasts/Toasts";
import { AppThunkAction } from "../../../ApplicationState";
import { ToastAction, ToastDispatchables } from "../../../toasts/Toasts.Actions";

export type SheetAddCondition = { type: 'SHEET_ADD_CONDITION', character: Character, condition: Condition }
export type SheetRemoveCondition = { type: 'SHEET_REMOVE_CONDITION', character: Character, condition: Condition }

export type SheetConditionAction = SheetAddCondition | SheetRemoveCondition;

export const SheetConditionActions = {
    addCondition: (character: Character, condition: Condition): AppThunkAction<SheetConditionAction | ToastAction> =>
        async (dispatch, getState) => {
            const { api, user } = getState();
            const characterApi = api.characters;
            const adventureConnectionId = user.adventureConnectionId;

            const undo = () => {
                dispatch({ type: 'SHEET_REMOVE_CONDITION', character, condition });
                ToastDispatchables.toast(new ErrorToast(`Error adding ${condition.name}.`), dispatch);
            }

            dispatch({ type: 'SHEET_ADD_CONDITION', character, condition });

            try {
                const response = await characterApi.addCondition(adventureConnectionId, character.id, condition.id);
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

    removeCondition: (character: Character, condition: Condition): AppThunkAction<SheetConditionAction | ToastAction> =>
        async (dispatch, getState) => {
            const { api, user } = getState();
            const characterApi = api.characters;
            const adventureConnectionId = user.adventureConnectionId;
            const undo = () => {
                dispatch({ type: 'SHEET_ADD_CONDITION', character, condition });
                ToastDispatchables.toast(new ErrorToast(`Error removing ${condition.name}.`), dispatch);
            }
            dispatch({ type: 'SHEET_REMOVE_CONDITION', character, condition });

            try {
                const response = await characterApi.removeCondition(character.id, condition.id);
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