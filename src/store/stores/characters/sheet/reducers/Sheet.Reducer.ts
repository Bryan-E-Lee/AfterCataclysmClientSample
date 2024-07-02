import { Action, Reducer } from "redux";
import { Character } from "../../../../../entities/characters/Character";
import { SheetAction } from "../actions/Sheet.Actions";
import { SheetDefaultState, SheetState } from "../Sheet.State";
import { ConditionActionReducers as SheetConditionReducers } from "./SheetConditionReducers";
import { ItemActionReducers as SheetItemReducers } from "./SheetItemReducers";
import { MinionActionReducers as SheetMinionReducers } from "./SheetMinionReducer";
import { PerkActionReducers as SheetPerkReducers } from "./SheetPerkReducers";
import { PersonalityActionReducers as SheetPersonalityReducers } from "./SheetPersonalityReducers";
import { RhetoricActionReducers as SheetRhetoricReducers } from "./SheetRhetoricReducers";
import { SkillActionReducers as SheetSkillReducers } from "./SheetSkillReducers";
import { SheetToolReducers } from "./SheetToolReducers";
import { SheetCompetencyReducers } from "./SheetCompetencyReducers";
import { SheetPropertyReducers } from "./SheetPropertyReducers";
import { RestrictNumber } from "../../../../../entities/Utilities";

export const SheetReducer: Reducer<SheetState> = (
    state: SheetState | undefined,
    incomingAction: Action
): SheetState => {
    if (state == undefined) {
        return SheetDefaultState;
    }
    let pendingProperties = {};
    const action = incomingAction as SheetAction;
    switch (action.type) {
        //Tools
        case 'SHEET_SET':
            return SheetToolReducers.setSheet(state, action);
        case 'SHEET_SET_PREVIEW_ITEM_INSTANCE_ID':
            return SheetToolReducers.previewItem(state, action);
        case 'SHEET_SET_PREVIEW_SLOT_ID':
            return SheetToolReducers.previewSlot(state, action);
        case 'SHEET_SHOW_ITEM_ADDER':
            return SheetToolReducers.showItemAdder(state, action);
        case 'SHEET_HIDE_ITEM_ADDER':
            return SheetToolReducers.hideItemAdder(state);
        case 'SHEET_FILTER_ITEMS':
            return SheetToolReducers.filterItems(state, action);
        case 'SHEET_ROLL_HAND':
            return SheetToolReducers.rollHand(state, action);
        case 'SHEET_SET_ROLL':
            return SheetToolReducers.setRoll(state, action);
        case 'SHEET_SET_COMMUNAL_ROLLS':
            return SheetToolReducers.setCommunalRolls(state, action);
        case 'SHEET_SET_ROLL_SKILL':
            return SheetToolReducers.setRollSkill(state, action);
        case 'SHEET_CLEAR_ROLL_SKILL':
            return SheetToolReducers.clearRollSkill(state);
        case 'SHEET_REROLL':
            return SheetToolReducers.reroll(state, action);
        case 'SHEET_KEEP_ROLLS':
            return SheetToolReducers.keep(state, action);

        //Properties
        case 'SHEET_SET_RULE_ENFORCEMENT':
            return SheetPropertyReducers.setRuleEnforcement(state, action);
        case 'SHEET_UPDATE_NAME':
            return { ...state, name: action.name };
        case 'SHEET_UPDATE_KINSHIP':
            return { ...state, kinship: action.kinship };
        case 'SHEET_UPDATE_LEVEL':
            return { ...state, level: RestrictNumber(action.level, Character.MinLevel, Character.MaxLevel) };
        case 'SHEET_UPDATE_CLASS_NAME':
            return { ...state, className: action.className };
        case 'SHEET_ADJUST_MOVEMENT':
            return { ...state, movementAdjust: action.movementAdjust };
        case 'SHEET_OVERRIDE_MOVEMENT':
            return { ...state, movementOverride: action.movementOverride };
        case 'SHEET_UPDATE_HEALTH':
            return { ...state, currentHealth: RestrictNumber(action.newHealth, 0, action.character.maxHealth) };
        case 'SHEET_SET_JUICED':
            return { ...state, juiced: action.juiced };
        case 'SHEET_UPDATE_MONEY':
            return { ...state, money: action.newMoney };
        case 'SHEET_PENDING_PROPERTY':
            return SheetPropertyReducers.setPropertiesPending(state, [action.propertyName]);
        case 'SHEET_PENDING_PROPERTIES':
            return SheetPropertyReducers.setPropertiesPending(state, action.propertyNames);
        case 'SHEET_SAVE_PROPERTY':
            return SheetPropertyReducers.setPropertiesSaved(state, [action.propertyName]);
        case 'SHEET_SAVE_PROPERTIES':
            return SheetPropertyReducers.setPropertiesSaved(state, action.propertyNames);

        //Competencies
        case 'SHEET_ADD_COMPETENCY':
            return { ...state, competencies: [...state.competencies, action.competency] };
        case 'SHEET_ADD_CUSTOM_COMPETENCY':
            return { ...state, customCompetencies: [...state.customCompetencies, action.competency] };
        case 'SHEET_REMOVE_COMPETENCY':
            return SheetCompetencyReducers.removeCompetency(state, action);
        case 'SHEET_SET_COMPTENCY_LEVEL':
            return SheetCompetencyReducers.setCompetencyLevel(state, action);
        case 'SHEET_SAVE_COMPETENCY':
            return SheetCompetencyReducers.saveCompetency(state, action);
        case 'SHEET_SAVE_CUSTOM_COMPETENCY':
            return SheetCompetencyReducers.saveCustomCompetency(state, action);


        //Conditions
        case 'SHEET_ADD_CONDITION':
            return SheetConditionReducers.addCondition(state, action);
        case 'SHEET_REMOVE_CONDITION':
            return SheetConditionReducers.removeCondition(state, action);

        //Items
        case 'SHEET_ADD_ITEM':
            return SheetItemReducers.addItem(state, action);
        case 'SHEET_MOVE_ITEMS':
            return SheetItemReducers.moveItems(state, action);
        case 'SHEET_REMOVE_ITEMS':
            return SheetItemReducers.removeItems(state, action);
        case 'SHEET_SAVE_ITEM':
            return SheetItemReducers.saveItem(state, action);

        case 'SHEET_UPDATE_ITEM_NAME':
            return SheetItemReducers.updateItemName(state, action);
        case 'SHEET_UPDATE_ITEM_NOTES':
            return SheetItemReducers.updateItemNotes(state, action);

        case 'SHEET_ASSIGN_MOD':
            return SheetItemReducers.assignMod(state, action);
        case 'SHEET_REMOVE_MOD':
            return SheetItemReducers.removeMod(state, action);

        case 'SHEET_ADD_SLOTS':
            return SheetItemReducers.addSlots(state, action);
        case 'SHEET_REMOVE_SLOTS':
            return SheetItemReducers.removeSlots(state, action);
        case 'SHEET_UPDATE_SLOTS':
            return SheetItemReducers.updateSlots(state, action);

        case 'SHEET_ASSIGN_BODY_MOD':
            return SheetItemReducers.assignBodyMod(state, action);
        case 'SHEET_REMOVE_BODY_MOD':
            return SheetItemReducers.removeBodyMod(state, action);

        //Minions
        case 'SHEET_SAVE_MINION':
            return SheetMinionReducers.saveMinion(state, action);
        case 'SHEET_ADD_MINION':
            return SheetMinionReducers.addMinion(state, action);
        case 'SHEET_REMOVE_MINION':
            return SheetMinionReducers.removeMinion(state, action);
        case 'SHEET_UPDATE_MINION':
            return SheetMinionReducers.updateMinion(state, action);

        //Skills
        case 'SHEET_SAVE_SKILL':
            return SheetSkillReducers.saveSkill(state, action);
        case 'SHEET_UPDATE_SKILL':
            return SheetSkillReducers.updateSkill(state, action);
        case 'SHEET_ADJUST_SKILL':
            return SheetSkillReducers.adjustSkill(state, action);
        case 'SHEET_OVERRIDE_SKILL':
            return SheetSkillReducers.overrideSkill(state, action);

        //Rhetorics
        case 'SHEET_SAVE_RHETORIC':
            return SheetRhetoricReducers.saveRhetoric(state, action);
        case 'SHEET_UPDATE_RHETORIC_PRIORITY':
            return SheetRhetoricReducers.updateRhetoric(state, action);
        case 'SHEET_ADJUST_RHETORIC':
            return SheetRhetoricReducers.adjustRhetoric(state, action);
        case 'SHEET_OVERRIDE_RHETORIC':
            return SheetRhetoricReducers.overrideRhetoric(state, action);

        //Personalities
        case 'SHEET_SAVE_PERSONALITY':
            return SheetPersonalityReducers.savePersonality(state, action);
        case 'SHEET_ADD_PERSONALITY':
            return SheetPersonalityReducers.addPersonality(state, action);
        case 'SHEET_REMOVE_PERSONALITY':
            return SheetPersonalityReducers.removePersonality(state, action);

        //Perks
        case 'SHEET_SAVE_PERK':
            return SheetPerkReducers.savePerk(state, action);
        case 'SHEET_ADD_PERK':
            return SheetPerkReducers.addPerk(state, action);
        case 'SHEET_REMOVE_PERK':
            return SheetPerkReducers.removePerk(state, action);

        default:
            return state;
    }
}