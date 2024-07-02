import { Character } from "../../../../../entities/characters/Character";
import { Skill } from "../../../../../entities/library/skills/Skill";
import { SkillMap, SkillName } from "../../../../../entities/library/skills/SkillMap";
import { ErrorToast } from "../../../../../entities/toasts/Toasts";
import { TimedThrottle } from "../../../../ConcurrencyUtilities";
import { AppThunkAction } from "../../../ApplicationState";
import { ToastAction, ToastDispatchables } from "../../../toasts/Toasts.Actions";
import { SheetUpdateHealth, SheetSetJuiced } from "./SheetPropertyActions";

export type SheetSaveSkill = { type: 'SHEET_SAVE_SKILL', character: Character, skillName: SkillName }
export type SheetUpdateSkill = { type: 'SHEET_UPDATE_SKILL', character: Character, skillName: SkillName, updateBy: number };
export type SheetAdjustSkill = { type: 'SHEET_ADJUST_SKILL', character: Character, skillName: SkillName, adjustment: number };
export type SheetOverrideSkill = { type: 'SHEET_OVERRIDE_SKILL', character: Character, skillName: SkillName, override?: number };

export type SheetSkillAction = SheetSaveSkill
    | SheetUpdateSkill
    | SheetAdjustSkill
    | SheetOverrideSkill;

const throttleTimer = 500;
const SkillUpdateThrottles: {
    [name in SkillName]?: TimedThrottle
} = {};

export const SheetSkillActions = {
    updateSkill: (character: Character, skill: Skill, updateBy: number): AppThunkAction<SheetSkillAction | SheetUpdateHealth | SheetSetJuiced | ToastAction> =>
        async (dispatch, getState) => {
            const { sheet, api: { characters: characterApi } } = getState();

            SkillUpdateThrottles[skill.name] = SkillUpdateThrottles[skill.name] ?? new TimedThrottle(throttleTimer);

            const oldVersion = { ...skill };

            const oldHealth = character.currentHealth;
            const oldHealthRatio = character.currentHealth / character.maxHealth;

            const undo = () => {
                dispatch({ type: 'SHEET_UPDATE_SKILL', character, skillName: skill.name, updateBy: updateBy * -1 });
                dispatch({ type: 'SHEET_UPDATE_HEALTH', character, newHealth: oldHealth });
                ToastDispatchables.toast(new ErrorToast(`Error updating ${skill.name}.`), dispatch);
            }

            dispatch({ type: 'SHEET_UPDATE_SKILL', character, skillName: skill.name, updateBy });
            
            const newHealth = Math.round(character.maxHealth * oldHealthRatio);
            const oldCharacterVersion = { ...sheet };
            const newCharacterVersion = { ...sheet, currentHealth: newHealth };
            dispatch({ type: 'SHEET_UPDATE_HEALTH', character, newHealth });

            try {
                const callback = async () => {
                    const patchState = getState();
                    const newVersion = patchState.sheet.skills.first(s => s.id == skill.id);
                    if (newVersion == null) {
                        return;
                    }

                    const [skillResponse, characterResponse] = await Promise.all([
                        characterApi.updateSkill(character.id, oldVersion, newVersion),
                        characterApi.patchCharacter(oldCharacterVersion, newCharacterVersion)
                    ]);
                    if (skillResponse.status == 'Error') {
                        undo();
                        ToastDispatchables.toastValidationResults(skillResponse.validationResults, dispatch);
                    }
                    else if (characterResponse.status == 'Error') {
                        undo();
                        ToastDispatchables.toastValidationResults(characterResponse.validationResults, dispatch);
                    }
                }

                await SkillUpdateThrottles[skill.name]!.scheduleProcess(callback);
            }
            catch (e) {
                undo();
                console.error(e);
            }
        },

    adjustSkill: (character: Character, skill: Skill, adjustment: number): AppThunkAction<SheetSkillAction | SheetUpdateHealth | SheetSetJuiced | ToastAction> =>
        async (dispatch, getState) => {
            const { sheet, api: { characters: characterApi } } = getState();

            const oldVersion = { ...skill };
            const newVersion = { ...skill, adjustment };

            const oldHealth = character.currentHealth;
            const oldHealthRatio = character.currentHealth / character.maxHealth;

            const undo = () => {
                dispatch({ type: 'SHEET_ADJUST_SKILL', character, skillName: skill.name, adjustment: oldVersion.adjustment });
                dispatch({ type: 'SHEET_UPDATE_HEALTH', character, newHealth: oldHealth });
                ToastDispatchables.toast(new ErrorToast(`Error adjusting ${skill.name}.`), dispatch);
            }
            
            dispatch({ type: 'SHEET_ADJUST_SKILL', character, skillName: skill.name, adjustment: newVersion.adjustment });
            
            const newHealth = Math.round(character.maxHealth * oldHealthRatio);
            const oldCharacterVersion = { ...sheet };
            const newCharacterVersion = { ...sheet, currentHealth: newHealth };
            dispatch({ type: 'SHEET_UPDATE_HEALTH', character, newHealth });

            try {
                const [skillResponse, characterResponse] = await Promise.all([
                    characterApi.updateSkill(character.id, oldVersion, newVersion),
                    characterApi.patchCharacter(oldCharacterVersion, newCharacterVersion)
                ]);
                if (skillResponse.status == 'Error') {
                    undo();
                    ToastDispatchables.toastValidationResults(skillResponse.validationResults, dispatch);
                }
                else if (characterResponse.status == 'Error') {
                    undo();
                    ToastDispatchables.toastValidationResults(characterResponse.validationResults, dispatch);
                }
            }
            catch (e) {
                undo();
                console.error(e);
            }
        },

    overrideSkill: (character: Character, skill: Skill, override: number | undefined): AppThunkAction<SheetSkillAction | SheetUpdateHealth | SheetSetJuiced | ToastAction> =>
        async (dispatch, getState) => {
            const { sheet, api: { characters: characterApi } } = getState();

            const oldVersion = { ...skill };
            const newVersion = { ...skill, override };

            const oldHealth = character.currentHealth;
            const oldHealthRatio = character.currentHealth / character.maxHealth;

            const undo = () => {
                dispatch({ type: 'SHEET_OVERRIDE_SKILL', character, skillName: skill.name, override: skill.override });
                dispatch({ type: 'SHEET_UPDATE_HEALTH', character, newHealth: oldHealth });
                ToastDispatchables.toast(new ErrorToast(`Server error overriding ${skill.name}.`), dispatch);
            }

            dispatch({ type: 'SHEET_OVERRIDE_SKILL', character, skillName: skill.name, override });

            const newHealth = Math.round(character.maxHealth * oldHealthRatio);
            const oldCharacterVersion = { ...sheet };
            const newCharacterVersion = { ...sheet, currentHealth: newHealth };
            dispatch({ type: 'SHEET_UPDATE_HEALTH', character, newHealth });

            try {
                const [skillResponse, characterResponse] = await Promise.all([
                    characterApi.updateSkill(character.id, oldVersion, newVersion),
                    characterApi.patchCharacter(oldCharacterVersion, newCharacterVersion)
                ]);
                if (skillResponse.status == 'Error') {
                    undo();
                    ToastDispatchables.toastValidationResults(skillResponse.validationResults, dispatch);
                }
                else if (characterResponse.status == 'Error') {
                    undo();
                    ToastDispatchables.toastValidationResults(characterResponse.validationResults, dispatch);
                }
            }
            catch (e) {
                undo();
                console.error(e);
            }
        }
}