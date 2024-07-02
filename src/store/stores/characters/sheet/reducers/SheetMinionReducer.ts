import { Minion } from "../../../../../entities/library/minions/Minion";
import { SheetSaveMinion, SheetAddMinion, SheetRemoveMinion, SheetUpdateMinion } from "../actions/SheetMinionActions";
import { SheetState } from "../Sheet.State";

const updateMinions = (state: SheetState, ...minions: Minion[]) => ({...state, minions});

const saveMinion = (state: SheetState, action: SheetSaveMinion): SheetState => {
    const { character, oldInstanceId, newInstanceId } = action;
    const minion = character.minions.get(oldInstanceId);
    if (minion == undefined) {
        console.error('Attempt to save nonexistent minion.');
        return state;
    }

    minion.instanceId = newInstanceId;
    minion.saved = true;
    return updateMinions(state, ...character.minions);
}

const addMinion = (state: SheetState, action: SheetAddMinion): SheetState => {
    const { character, minion } = action;
    if (character.minions.containsKey(minion.instanceId)) {
        console.error('Attempt to add duplicate minion.');
        return state;
    }
    character.minions.add(new Minion(minion));
    return updateMinions(state, ...character.minions);
}

const removeMinion = (state: SheetState, action: SheetRemoveMinion): SheetState => {
    const { character, minionInstanceId } = action;
    if (!character.minions.containsKey(minionInstanceId)) {
        console.error('Attempt to remove nonexistent minion.');
        return state;
    }
    character.minions.removeByKey(minionInstanceId);
    return updateMinions(state, ...character.minions);
}

const updateMinion = (state: SheetState, action: SheetUpdateMinion): SheetState => {
    const { character, minion } = action;
    if (!character.minions.containsKey(minion.instanceId)) {
        console.error('Attempt to update nonexistent minion.');
        return state;
    }
    const updatedMinion = new Minion(minion);
    character.minions.updateByKey(updatedMinion);
    return updateMinions(state, ...character.minions);
}

export const MinionActionReducers = {
    saveMinion,
    addMinion,
    removeMinion,
    updateMinion,
}