import { Character } from "../../../../../entities/characters/Character";
import { Skill } from "../../../../../entities/library/skills/Skill";
import { RestrictNumber } from "../../../../../entities/Utilities";
import { SheetSaveSkill, SheetUpdateSkill, SheetAdjustSkill, SheetOverrideSkill } from "../actions/SheetSkillActions";
import { SheetState } from "../Sheet.State";

const updateSheetSkills = (state: SheetState, character: Character) => ({
    ...state,
    skills: [...character.skills],
    currentHealth: character.currentHealth
});

const saveSkill = (state: SheetState, action: SheetSaveSkill): SheetState => {
    const { character, skillName: skillId } = action;
    const skill = character.skills.get(skillId);
    if (skill == null) {
        console.error('Attempt to save nonexistent skill.');
        return state;
    }
    skill.saved = true;
    return updateSheetSkills(state, character);
}

const updateSkill = (state: SheetState, action: SheetUpdateSkill): SheetState => {
    const { character, skillName, updateBy } = action;
    const healthRatio = character.currentHealth / character.maxHealth;
    const skill = character.skills.get(skillName);
    if (skill == null) {
        console.error('Attempt update nonexistent skill.');
        return state;
    }
    skill.level += updateBy;
    skill.level = RestrictNumber(skill.level, Skill.MinValue, Skill.MaxValue);
    skill.saved = !skill.saved;
    character.currentHealth = Math.round(character.maxHealth * healthRatio);
    return updateSheetSkills(state, character);
};

const adjustSkill = (state: SheetState, action: SheetAdjustSkill): SheetState => {
    const { character, skillName, adjustment } = action;
    const healthRatio = character.currentHealth / character.maxHealth;
    const skill = character.skills.get(skillName);
    if (skill == null) {
        console.error('Attempt adjust nonexistent skill.');
        return state;
    }
    skill.adjustment = adjustment;
    skill.saved = !skill.saved;
    character.currentHealth = Math.round(character.maxHealth * healthRatio);
    return updateSheetSkills(state, character);
}

const overrideSkill = (state: SheetState, action: SheetOverrideSkill): SheetState => {
    let { character, skillName, override } = action;
    const healthRatio = character.currentHealth / character.maxHealth;
    const skill = character.skills.get(skillName);
    if (skill == null) {
        console.error('Attempt override nonexistent skill.');
        return state;
    }
    if (override != undefined && override <= 0) {
        override = undefined;
    }
    skill.override = override;
    skill.saved = !skill.saved;
    character.currentHealth = Math.round(character.maxHealth * healthRatio);
    return updateSheetSkills(state, character);
}

export const SkillActionReducers = {
    saveSkill,
    updateSkill,
    adjustSkill,
    overrideSkill,
}