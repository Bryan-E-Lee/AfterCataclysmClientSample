import { Condition } from "../../../../../entities/characters/Conditions";
import { SheetAddCondition, SheetRemoveCondition } from "../actions/SheetConditionActions";
import { SheetState } from "../Sheet.State";

const updateConditions = (state: SheetState, ...conditions: Condition[]) => {
    return ({ ...state, conditions: conditions.map(c => c.id) });
}

const addCondition = (state: SheetState, action: SheetAddCondition): SheetState => {
    const { character, condition } = action;
    if (character.conditions.containsKey(condition.id)) {
        console.error('Attempt to add duplicate condition.');
        return state;
    }

    character.conditions.add(condition);
    return updateConditions(state, ...character.conditions);
}

const removeCondition = (state: SheetState, action: SheetRemoveCondition): SheetState => {
    const { character, condition } = action;
    if (!character.conditions.containsKey(condition.id)) {
        console.error('Attempt to remove nonexistent condition.');
        return state;
    }

    character.conditions.remove(condition);
    return updateConditions(state, ...character.conditions);
}

export const ConditionActionReducers = {
    addCondition,
    removeCondition,
}