import { PatchableProperty } from "../../../../../entities/PatchableProperty";
import { Character, CharacterInitializer } from "../../../../../entities/characters/Character";
import { Kinship } from "../../../../../entities/characters/Kinships";
import { ErrorToast } from "../../../../../entities/toasts/Toasts";
import { AppThunkAction } from "../../../ApplicationState";
import { ToastAction, ToastDispatchables } from "../../../toasts/Toasts.Actions";

type SheetUpdateName = { type: 'SHEET_UPDATE_NAME', name: string };
type SheetUpdateKinship = { type: 'SHEET_UPDATE_KINSHIP', kinship: Kinship };
type SheetUpdateLevel = { type: 'SHEET_UPDATE_LEVEL', level: number };
type SheetUpdateClassName = { type: 'SHEET_UPDATE_CLASS_NAME', className: string };
type SheetAdjustMovement = { type: 'SHEET_ADJUST_MOVEMENT', movementAdjust: number };
type SheetOverrideMovement = { type: 'SHEET_OVERRIDE_MOVEMENT', movementOverride?: number };
export type SheetUpdateHealth = { type: 'SHEET_UPDATE_HEALTH', character: Character, newHealth: number };
export type SheetSetJuiced = { type: 'SHEET_SET_JUICED', character: Character, juiced: boolean };
type SheetUpdateMoney = { type: 'SHEET_UPDATE_MONEY', character: Character, newMoney: number };
export type SheetPendingProperty = { type: 'SHEET_PENDING_PROPERTY', propertyName: PatchableProperty<CharacterInitializer> };
export type SheetPendingProperties = { type: 'SHEET_PENDING_PROPERTIES', propertyNames: PatchableProperty<CharacterInitializer>[] };
export type SheetSaveProperty = { type: 'SHEET_SAVE_PROPERTY', propertyName: PatchableProperty<CharacterInitializer> };
export type SheetSaveProperties = { type: 'SHEET_SAVE_PROPERTIES', propertyNames: PatchableProperty<CharacterInitializer>[] };
export type SheetSetRuleEnforcement = { type: 'SHEET_SET_RULE_ENFORCEMENT', enforceRules: boolean }

type SheetSaveAction = SheetPendingProperty | SheetPendingProperties | SheetSaveProperty | SheetSaveProperties;

export type SheetPropertyAction = SheetUpdateName
    | SheetUpdateKinship
    | SheetUpdateLevel
    | SheetUpdateClassName
    | SheetAdjustMovement
    | SheetOverrideMovement
    | SheetUpdateHealth
    | SheetSetJuiced
    | SheetUpdateMoney
    | SheetSaveAction
    | SheetSetRuleEnforcement;

export const SheetPropertyActions = {
    updateName: (name: string): AppThunkAction<SheetUpdateName | SheetSaveAction | ToastAction> =>
        async (dispatch, getState) => {
            const propertyName = "name";
            const { sheet, api: { characters: characterApi } } = getState();
            const oldVersion = { ...sheet };
            const newVersion = { ...sheet, name };
            const undo = () => {
                dispatch({ type: 'SHEET_UPDATE_NAME', name: oldVersion.name });
                dispatch({ type: 'SHEET_SAVE_PROPERTY', propertyName });
                ToastDispatchables.toast(new ErrorToast('Error updating name.'), dispatch);
            }
            dispatch({ type: 'SHEET_UPDATE_NAME', name });
            dispatch({ type: 'SHEET_PENDING_PROPERTY', propertyName });

            try {
                const response = await characterApi.patchCharacter(oldVersion, newVersion);
                if (response.status == 'Error') {
                    undo();
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
                else {
                    dispatch({ type: 'SHEET_SAVE_PROPERTY', propertyName });
                }
            }
            catch (e) {
                undo();
                console.error(e);
            }
        },

    updateKinship: (kinship: Kinship): AppThunkAction<SheetUpdateKinship | SheetSaveAction | ToastAction> =>
        async (dispatch, getState) => {
            const propertyName = "kinship";
            const { sheet, api: { characters: characterApi } } = getState();
            const oldVersion = { ...sheet };
            const newVersion = { ...sheet, kinship };
            const undo = () => {
                dispatch({ type: 'SHEET_UPDATE_KINSHIP', kinship: oldVersion.kinship });
                dispatch({ type: 'SHEET_SAVE_PROPERTY', propertyName });
                ToastDispatchables.toast(new ErrorToast('Error updating kinship.'), dispatch);
            }
            dispatch({ type: 'SHEET_UPDATE_KINSHIP', kinship });
            dispatch({ type: 'SHEET_PENDING_PROPERTY', propertyName });

            try {
                const response = await characterApi.patchCharacter(oldVersion, newVersion);
                if (response.status == 'Error') {
                    undo();
                }
                else {
                    dispatch({ type: 'SHEET_SAVE_PROPERTY', propertyName });
                }
            }
            catch (e) {
                undo();
                console.error(e);
            }
        },

    updateLevel: (character: Character, level: number): AppThunkAction<SheetUpdateLevel | SheetUpdateHealth | SheetSetJuiced | SheetSaveAction | ToastAction> =>
        async (dispatch, getState) => {
            const propertyNames: PatchableProperty<CharacterInitializer>[] = ["level", "currentHealth"];
            const { sheet, api: { characters: characterApi } } = getState();
            if (sheet.level == level) {
                return;
            }
            const oldVersion = { ...sheet };
            const oldHealth = character.currentHealth;
            const oldHealthRatio = character.currentHealth / character.maxHealth;

            const undo = () => {
                dispatch({ type: 'SHEET_UPDATE_LEVEL', level: oldVersion.level });
                dispatch({ type: 'SHEET_UPDATE_HEALTH', character, newHealth: oldHealth });
                dispatch({ type: 'SHEET_SAVE_PROPERTIES', propertyNames });
                ToastDispatchables.toast(new ErrorToast('Error updating level.'), dispatch);
            }
            dispatch({ type: 'SHEET_UPDATE_LEVEL', level });

            character.level = level;
            const newHealth = Math.round(character.maxHealth * oldHealthRatio);
            const newVersion = { ...sheet, level, currentHealth: newHealth };
            dispatch({ type: 'SHEET_UPDATE_HEALTH', character, newHealth });
            dispatch({ type: 'SHEET_PENDING_PROPERTIES', propertyNames });

            try {
                const response = await characterApi.patchCharacter(oldVersion, newVersion);
                if (response.status == 'Error') {
                    undo();
                }
                else {
                    dispatch({ type: 'SHEET_SAVE_PROPERTIES', propertyNames });
                }
            }
            catch (e) {
                undo();
                console.error(e);
            }
        },
    
    updateClassName: (className: string): AppThunkAction<SheetUpdateClassName | SheetSaveAction | ToastAction> =>
        async (dispatch, getState) => {
            const propertyName = "className";
            const { sheet, api: { characters: characterApi } } = getState();
            const oldVersion = { ...sheet };
            const newVersion = { ...sheet, className };
            const undo = () => {
                dispatch({ type: 'SHEET_UPDATE_CLASS_NAME', className: oldVersion.className });
                dispatch({ type: 'SHEET_SAVE_PROPERTY', propertyName });
                ToastDispatchables.toast(new ErrorToast('Error updating class.'), dispatch);
            }
            dispatch({ type: 'SHEET_UPDATE_CLASS_NAME', className });
            dispatch({ type: 'SHEET_PENDING_PROPERTY', propertyName });

            try {
                const response = await characterApi.patchCharacter(oldVersion, newVersion);
                if (response.status == 'Error') {
                    undo();
                }
                else {
                    dispatch({ type: 'SHEET_SAVE_PROPERTY', propertyName });
                }
            }
            catch (e) {
                undo();
                console.error(e);
            }
        },

    adjustMovement: (movementAdjust: number): AppThunkAction<SheetAdjustMovement | SheetSaveAction | ToastAction> =>
        async (dispatch, getState) => {
            const propertyName = "movementAdjust";
            const { sheet, api: { characters: characterApi } } = getState();
            const oldVersion = { ...sheet };
            const newVersion = { ...sheet, movementAdjust };
            const undo = () => {
                dispatch({ type: 'SHEET_ADJUST_MOVEMENT', movementAdjust });
                dispatch({ type: 'SHEET_SAVE_PROPERTY', propertyName });
                ToastDispatchables.toast(new ErrorToast('Error adjusting movement.'), dispatch);
            }
            dispatch({ type: 'SHEET_ADJUST_MOVEMENT', movementAdjust });
            dispatch({ type: 'SHEET_PENDING_PROPERTY', propertyName });

            try {
                const response = await characterApi.patchCharacter(oldVersion, newVersion);
                if (response.status == 'Error') {
                    undo();
                }
                else {
                    dispatch({ type: 'SHEET_SAVE_PROPERTY', propertyName });
                }
            }
            catch (e) {
                undo();
                console.error(e);
            }
        },
        
    overrideMovement: (movementOverride: number | undefined): AppThunkAction<SheetOverrideMovement | SheetSaveAction | ToastAction> =>
        async (dispatch, getState) => {
            const propertyName = "movementOverride";
            const { sheet, api: { characters: characterApi } } = getState();
            const oldVersion = { ...sheet };
            const newVersion = { ...sheet, movementOverride };
            const undo = () => {
                dispatch({ type: 'SHEET_OVERRIDE_MOVEMENT', movementOverride: oldVersion.movementOverride });
                dispatch({ type: 'SHEET_SAVE_PROPERTY', propertyName });
                ToastDispatchables.toast(new ErrorToast('Error overriding movement.'), dispatch);
            }
            dispatch({ type: 'SHEET_OVERRIDE_MOVEMENT', movementOverride });
            dispatch({ type: 'SHEET_PENDING_PROPERTY', propertyName });

            try {
                const response = await characterApi.patchCharacter(oldVersion, newVersion);
                if (response.status == 'Error') {
                    undo();
                }
                else {
                    dispatch({ type: 'SHEET_SAVE_PROPERTY', propertyName });
                }
            }
            catch (e) {
                undo();
                console.error(e);
            }
        },

    updateHealth: (character: Character, newHealth: number): AppThunkAction<SheetUpdateHealth | SheetSaveAction | ToastAction> =>
        async (dispatch, getState) => {
            const propertyName = "currentHealth";
            const { sheet, api: { characters: characterApi } } = getState();
            const oldVersion = { ...sheet };
            const newVersion = { ...sheet, currentHealth: newHealth };
            const undo = () => {
                dispatch({ type: 'SHEET_UPDATE_HEALTH', character, newHealth: oldVersion.currentHealth });
                dispatch({ type: 'SHEET_SAVE_PROPERTY', propertyName });
                ToastDispatchables.toast(new ErrorToast('Error updating health.'), dispatch);
            }
            dispatch({ type: 'SHEET_UPDATE_HEALTH', character, newHealth });
            dispatch({ type: 'SHEET_PENDING_PROPERTY', propertyName });

            try {
                const response = await characterApi.patchCharacter(oldVersion, newVersion);
                if (response.status == 'Error') {
                    undo();
                }
                else {
                    dispatch({ type: 'SHEET_SAVE_PROPERTY', propertyName });
                }
            }
            catch (e) {
                undo();
                console.error(e);
            }
        },

    setJuiced: (character: Character, juiced: boolean): AppThunkAction<SheetSetJuiced | SheetSaveAction | ToastAction> =>
        async (dispatch, getState) => {
            const propertyName = "juiced";
            const { sheet, api: { characters: characterApi } } = getState();
            const oldVersion = { ...sheet };
            const newVersion = { ...sheet, juiced };
            const undo = () => {
                dispatch({ type: 'SHEET_SET_JUICED', character, juiced: oldVersion.juiced });
                dispatch({ type: 'SHEET_SAVE_PROPERTY', propertyName });
                ToastDispatchables.toast(new ErrorToast('Error updating name.'), dispatch);
            }
            dispatch({ type: 'SHEET_SET_JUICED', character, juiced });
            dispatch({ type: 'SHEET_PENDING_PROPERTY', propertyName });

            try {
                const response = await characterApi.patchCharacter(oldVersion, newVersion);
                if (response.status == 'Error') {
                    undo();
                }
                else {
                    dispatch({ type: 'SHEET_SAVE_PROPERTY', propertyName });
                }
            }
            catch (e) {
                undo();
                console.error(e);
            }
        },

    updateMoney: (character: Character, newMoney: number): AppThunkAction<SheetUpdateMoney | SheetSaveAction | ToastAction> =>
        async (dispatch, getState) => {
            const propertyName = "money";
            const { sheet, api } = getState();
            const oldVersion = { ...sheet };
            const newVersion = { ...sheet, money: newMoney };
            const undo = () => {
                dispatch({ type: 'SHEET_UPDATE_MONEY', character, newMoney: oldVersion.money });
                dispatch({ type: 'SHEET_SAVE_PROPERTY', propertyName });
                ToastDispatchables.toast(new ErrorToast('Error updating money.'), dispatch);
            }
            dispatch({ type: 'SHEET_UPDATE_MONEY', character, newMoney });
            dispatch({ type: 'SHEET_PENDING_PROPERTY', propertyName });

            try {
                const response = await api.characters.patchCharacter(oldVersion, newVersion);
                if (response.status == 'Error') {
                    undo();
                }
                else {
                    dispatch({ type: 'SHEET_SAVE_PROPERTY', propertyName });
                }
            }
            catch (e) {
                undo();
                console.error(e);
            }
        },

    setRuleEnforcement: (enforceRules: boolean): AppThunkAction<SheetSetRuleEnforcement | SheetSaveAction | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const propertyName = "enforceRules";
                const state = getState();
                const character = state.sheet;
                dispatch({ type: 'SHEET_SET_RULE_ENFORCEMENT', enforceRules });
                dispatch({ type: 'SHEET_PENDING_PROPERTY', propertyName });
                const characterApi = state.api.characters;
                const result = await characterApi.patchCharacter(character, { ...character, enforceRules });
                if (result.status == 'Error') {
                    dispatch({ type: 'SHEET_SET_RULE_ENFORCEMENT', enforceRules: !enforceRules });
                }
                else {
                    dispatch({ type: 'SHEET_SAVE_PROPERTY', propertyName });
                }
            }
            catch (e) {
                console.error(e);
                dispatch({ type: 'SHEET_SET_RULE_ENFORCEMENT', enforceRules: !enforceRules})
            }
        },
}