import { Character } from "../../../../../entities/characters/Character";
import { OwnedPerkInitializer, Perk, PerkInitializer } from "../../../../../entities/library/perks/Perk";
import { ErrorToast, InfoToast } from "../../../../../entities/toasts/Toasts";
import { getUniqueIdentifier } from "../../../../../utils/GUID";
import { AppThunkAction } from "../../../ApplicationState";
import { ToastAction, ToastDispatchables } from "../../../toasts/Toasts.Actions";

export type SheetSavePerk = { type: 'SHEET_SAVE_PERK', character: Character, id: string, instanceId: string };
export type SheetAddPerk = { type: 'SHEET_ADD_PERK', character: Character, perk: OwnedPerkInitializer };
export type SheetRemovePerk = { type: 'SHEET_REMOVE_PERK', character: Character, perkInstanceId: string };

export type SheetPerkAction = SheetSavePerk | SheetAddPerk | SheetRemovePerk;

export const SheetPerkActions = {
    addPerk: (character: Character, perk: PerkInitializer): AppThunkAction<SheetPerkAction | ToastAction> =>
        async (dispatch, getState) => {
            const { sheet, api: { characters: characterApi} } = getState();
            const instanceId = getUniqueIdentifier();
            const placeholder = { ...perk, instanceId, saved: false };

            const undo = () => {
                dispatch({ type: 'SHEET_REMOVE_PERK', character, perkInstanceId: instanceId });
                ToastDispatchables.toast(new ErrorToast(`Error adding ${perk.name}.`), dispatch);
            }
            dispatch({ type: 'SHEET_ADD_PERK', character, perk: placeholder });

            try {
                const response = await characterApi.addPerk(sheet.id, perk.id);
                if (response.status == 'Success') {
                    dispatch({ type: 'SHEET_SAVE_PERK', character, id: perk.id, instanceId: response.payload });
                    ToastDispatchables.toast(new InfoToast(`${perk.name} added.`), dispatch);
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

    removePerk: (character: Character, perk: Perk): AppThunkAction<SheetPerkAction | ToastAction> =>
        async (dispatch, getState) => {
            const { sheet, api: { characters: characterApi} } = getState();
            const undo = () => {
                dispatch({ type: 'SHEET_ADD_PERK', character, perk });
                ToastDispatchables.toast(new ErrorToast(`Error removing ${perk.name}.`), dispatch);
            }
            dispatch({ type: 'SHEET_REMOVE_PERK', character, perkInstanceId: perk.instanceId });

            try {
                const response = await characterApi.removePerk(sheet.id, perk.id);
                if (response.status == 'Success') {
                    ToastDispatchables.toast(new InfoToast(`${perk.name} removed.`), dispatch);
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