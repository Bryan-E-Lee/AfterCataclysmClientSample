import { Perk } from "../../../../../entities/library/perks/Perk";
import { SheetSavePerk, SheetAddPerk, SheetRemovePerk } from "../actions/SheetPerkActions";
import { SheetState } from "../Sheet.State";

const updatePerks = (state: SheetState, ...perks: Perk[]) => ({...state, perks});

const savePerk = (state: SheetState, action: SheetSavePerk): SheetState => {
    const { character, id, instanceId } = action;
    const perk = character.perks.get(id);
    if (perk == undefined) {
        console.error('Attempt to save nonexistent perk.');
        return state;
    }

    perk.instanceId = instanceId;
    perk.saved = true;
    return updatePerks(state, ...character.perks);
}

const addPerk = (state: SheetState, action: SheetAddPerk): SheetState => {
    const { character, perk } = action;
    if (character.perks.containsKey(perk.id)) {
        console.error('Attempt to add duplicate perk.');
        return state;
    }
    character.perks.add(new Perk(perk));
    return updatePerks(state, ...character.perks);
}

const removePerk = (state: SheetState, action: SheetRemovePerk): SheetState => {
    const { character, perkInstanceId } = action;
    if (!character.perks.collection.any(perk => perk.instanceId == perkInstanceId)) {
        console.error('Attempt to remove nonexistent perk.');
        return state;
    }
    const perks = character.perks.collection.filter(perk => perk.instanceId != perkInstanceId);
    return updatePerks(state, ...perks);
}

export const PerkActionReducers = {
    savePerk,
    addPerk,
    removePerk,
}