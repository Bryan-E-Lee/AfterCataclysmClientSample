import { UpdateIdResponse } from "../../../../../apis/responses/UpdateIdResponse";
import { Character } from "../../../../../entities/characters/Character";
import { isContainer } from "../../../../../entities/library/items/containers/Container";
import { Item } from "../../../../../entities/library/items/Item";
import { ItemFactory } from "../../../../../entities/library/items/ItemFactory";
import { isWeapon } from "../../../../../entities/library/items/weapons/Weapon";
import { SheetSaveItem, SheetAddItem, SheetRemoveItems, SheetAssignMod, SheetRemoveMod, SheetUpdateItemName, SheetUpdateItemNotes, SheetMoveItems, MoveItemGroupOperation, SheetAddSlots, SheetRemoveSlots, SheetUpdateSlots, SheetAssignBodyMod, SheetRemoveBodyMod } from "../actions/SheetItemActions";
import { SheetState } from "../Sheet.State";

const updateItems = (state: SheetState, character: Character) => ({
    ...state,
    bodyMods: [...character.bodyMods],
    held: [...character.held],
    worn: [...character.worn],
    loose: [...character.loose],
})

const saveItem = (state: SheetState, action: SheetSaveItem): SheetState => {
    const { character, newInstanceId, oldInstanceId } = action;
    const item = character.findItem(oldInstanceId);
    if (item == null) {
        return state;
    }
    item.instanceId = newInstanceId;
    item.saved = true;
    return updateItems(state, character);
}

const addItem = (state: SheetState, action: SheetAddItem): SheetState => {
    const { character, item } = action;
    character.loose.add(ItemFactory.Create(item));
    return updateItems(state, character);
}

const updateItemName = (state: SheetState, action: SheetUpdateItemName): SheetState => {
    const { character, itemInstanceId, customName } = action;
    const found = character.findItem(itemInstanceId);
    if (found == null) {
        console.error('Attempt to update item name on character it was not assigned to.');
        return state;
    }

    found.customName = customName;
    return updateItems(state, character);
}

const updateItemNotes = (state: SheetState, action: SheetUpdateItemNotes): SheetState => {
    const { character, itemInstanceId, customNotes } = action;
    const found = character.findItem(itemInstanceId);
    if (found == null) {
        console.error('Attempt to update item notes on character it was not assigned to.');
        return state;
    }

    found.customNotes = customNotes;
    return updateItems(state, character);
}

const moveItems = (state: SheetState, action: SheetMoveItems): SheetState => {
    const { character, operationOne, operationTwo } = action;
    const groupOneInstanceIds = operationOne.group.map(i => i.instanceId);
    const groupTwoInstanceIds = operationTwo?.group.map(i => i.instanceId) ?? [];
    character.removeItems(...groupOneInstanceIds);
    character.removeItems(...groupTwoInstanceIds);

    performMove(character, action.operationOne);
    if (action.operationTwo) {
        performMove(character, action.operationTwo);
    }

    return updateItems(state, character);
}

const performMove = (character: Character, operation: MoveItemGroupOperation) => {
    switch (operation.collection) {
        case 'Held':
            character.held.addRange(...operation.group.filter(isWeapon));
            return;
        case 'Worn':
            character.worn.addRange(...operation.group);
            return;
        case 'Loose':
            character.loose.addRange(...operation.group);
            return;
    }
}

const removeItems = (state: SheetState, action: SheetRemoveItems): SheetState => {
    const { character, instanceIds } = action;
    const removed = character.removeItems(...instanceIds);
    for (let item of removed) {
        character.loose.addRange(...item.containedItems);
    }
    return updateItems(state, character);
}

const assignMod = (state: SheetState, action: SheetAssignMod): SheetState => {
    const { character, item, mod, slotId } = action;
    if (character.findItem(item.instanceId) == null) {
        console.error('Attempt to assign mod to item on character it was not assigned to.');
        return state;
    }
    
    const existingModIndex = item.mods.findIndex(m => m.assignedSlotId == slotId);
    if (existingModIndex > -1) {
        const existingMod = item.mods[existingModIndex];
        existingMod.assignedSlotId = undefined;
        character.loose.add(existingMod);
        item.mods.splice(existingModIndex, 1);
    }

    mod.assignedSlotId = slotId;
    character.removeItem(mod.instanceId);
    item.mods.push(mod);
    return updateItems(state, character);
}

const assignBodyMod = (state: SheetState, action: SheetAssignBodyMod): SheetState => {
    const { character, mod, slotId } = action;

    const existingModIndex = character.bodyMods.findIndex(bm => bm.assignedSlotId == action.slotId);
    if (existingModIndex > -1) {
        const existingMod = character.bodyMods[existingModIndex]
        existingMod.assignedSlotId = undefined;
        character.loose.add(existingMod);
        character.bodyMods.splice(existingModIndex, 1);
    }

    mod.assignedSlotId = slotId;
    character.removeItem(mod.instanceId);
    character.bodyMods.push(mod);
    return updateItems(state, character);
}

const removeMod = (state: SheetState, action: SheetRemoveMod): SheetState => {
    const { character, item, slotId } = action;
    if (character.findItem(item.instanceId) == null) {
        console.error('Attempt to remove mod from item on character it was not assigned to.');
        return state;
    }

    const modIndex = item.mods.findIndex(m => m.assignedSlotId == slotId);
    const mod = item.mods[modIndex];
    if (mod == null) {
        console.error('Attempt to remove an unassigned mod.');
        return state;
    }

    delete mod.assignedSlotId;
    item.mods.splice(modIndex, 1);
    character.loose.add(mod);
    return updateItems(state, character);
}

const removeBodyMod = (state: SheetState, action: SheetRemoveBodyMod): SheetState => {
    const { character, slotId } = action;

    const existingModIndex = character.bodyMods.findIndex(bm => bm.assignedSlotId == action.slotId);
    if (existingModIndex < 0) {
        return state;
    }

    const existingMod = character.bodyMods[existingModIndex]
    existingMod.assignedSlotId = undefined;
    character.loose.add(existingMod);
    character.bodyMods.splice(existingModIndex, 1);
    
    return updateItems(state, character);
}

const addSlots = (state: SheetState, action: SheetAddSlots): SheetState => {
    const { character, requests } = action;

    for (let request of requests) {
        const item = character.findItem(request.itemInstanceId);
        if (item == null) {
            continue;
        }
        for (let slot of request.slots) {
            item.customSlots.push(slot);
        }
    }

    return updateItems(state, character);
}

const removeSlots = (state: SheetState, action: SheetRemoveSlots): SheetState => {
    const { character, itemIds, slotIds } = action;

    for (let itemId of itemIds) {
        const item = character.findItem(itemId);
        if (item != null) {
            removeSlotsFromItem(character, item, slotIds);
        }
    }
    return updateItems(state, character);
}

const removeSlotsFromItem = (character: Character, item: Item, slotIds: string[]) => {
    const removedSlots = item.customSlots.filter(cs => slotIds.contains(cs.id))
    item.customSlots = item.customSlots.filter(cs => !removedSlots.contains(cs));

    const removedSlotIds = removedSlots.map(rs => rs.id);
    const existingMod = item.mods.find(mod => removedSlotIds.contains(mod.assignedSlotId));
    if (existingMod != null) {
        delete existingMod.assignedSlotId;
        character.loose.add(existingMod);
    }
}

const updateSlots = (state: SheetState, action: SheetUpdateSlots): SheetState => {
    const { character, itemIds, updateIdResponses } = action;

    for (let itemId of itemIds) {
        const item = character.findItem(itemId);
        if (item != null) {
            updateItemSlots(item, updateIdResponses);
        }
    }

    return updateItems(state, character);
}

const updateItemSlots = (item: Item, updateIdResponses: UpdateIdResponse[]): void => {
    for (let slot of item.customSlots) {
        const matchingResponse = updateIdResponses.find(uir => uir.oldId == slot.id);
        if (matchingResponse != null) {
            slot.id = matchingResponse.newId;
        }
    }
}

export const ItemActionReducers = {
    saveItem,
    addItem,
    updateItemName,
    updateItemNotes,
    moveItems,
    removeItems,
    assignMod,
    assignBodyMod,
    removeMod,
    removeBodyMod,
    addSlots,
    removeSlots,
    updateSlots,
}