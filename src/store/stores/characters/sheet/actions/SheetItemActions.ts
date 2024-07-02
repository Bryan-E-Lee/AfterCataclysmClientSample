import { AddItemSlotsRequest } from "../../../../../apis/requests/AddItemSlotsRequest";
import { UpdateIdResponse } from "../../../../../apis/responses/UpdateIdResponse";
import { Character } from "../../../../../entities/characters/Character";
import { Item, ItemCollectionInfo, NonContainerCollectionName } from "../../../../../entities/library/items/Item";
import { ItemInitializer, ModInitializer, OwnedItemInitializer, OwnedModInitializer } from "../../../../../entities/library/items/ItemInitializers";
import { Mod } from "../../../../../entities/library/items/mods/Mod";
import { ModSlot } from "../../../../../entities/library/items/mods/ModSlot";
import { OwnedItemReference } from "../../../../../entities/Ownership";
import { ErrorToast, InfoToast, SuccessToast } from "../../../../../entities/toasts/Toasts";
import { getUniqueIdentifier } from "../../../../../utils/GUID";
import { nonEmpty } from "../../../../../utils/TypeUtils";
import { AppThunkAction } from "../../../ApplicationState";
import { CharacterUpdated } from "../../../collection/characters/CharacterStore.Actions";
import { ToastAction, ToastDispatchables } from "../../../toasts/Toasts.Actions";
import { SheetSet } from "./SheetToolActions";
import { SiteSetLoading } from "../../../site/SiteStore.Actions";

export type MoveItemGroupOperation = { group: Item[] } & ItemCollectionInfo;

export type SheetSaveItem = { type: 'SHEET_SAVE_ITEM', character: Character, oldInstanceId: string, newInstanceId: string }
export type SheetAddItem = { type: 'SHEET_ADD_ITEM', character: Character, item: OwnedItemInitializer }
export type SheetUpdateItemName = { type: 'SHEET_UPDATE_ITEM_NAME', character: Character, itemInstanceId: string, customName?: string }
export type SheetUpdateItemNotes = { type: 'SHEET_UPDATE_ITEM_NOTES', character: Character, itemInstanceId: string, customNotes?: string }
export type SheetRemoveItems = { type: 'SHEET_REMOVE_ITEMS', character: Character, instanceIds: string[] }
export type SheetMoveItems = { type: 'SHEET_MOVE_ITEMS', character: Character, operationOne: MoveItemGroupOperation, operationTwo?: MoveItemGroupOperation };
export type SheetUpdateItems = { type: 'SHEET_UPDATE_ITEMS', character: Character, items: OwnedItemReference[] }

export type SheetAssignMod = { type: 'SHEET_ASSIGN_MOD', character: Character, item: Item, mod: Mod, slotId: string }
export type SheetAssignBodyMod = { type: 'SHEET_ASSIGN_BODY_MOD', character: Character, mod: Mod, slotId: string }
export type SheetRemoveMod = { type: 'SHEET_REMOVE_MOD', character: Character, item: Item, slotId: string }
export type SheetRemoveBodyMod = { type: 'SHEET_REMOVE_BODY_MOD', character: Character, slotId: string }
export type SheetAddSlots = { type: 'SHEET_ADD_SLOTS', character: Character, requests: AddItemSlotsRequest[] }
export type SheetRemoveSlots = { type: 'SHEET_REMOVE_SLOTS', character: Character, itemIds: string[], slotIds: string[] }
export type SheetUpdateSlots = { type: 'SHEET_UPDATE_SLOTS', character: Character, itemIds: string[], updateIdResponses: UpdateIdResponse[] }

export type SheetItemAction = SheetSaveItem
    | SheetAddItem
    | SheetUpdateItemName
    | SheetUpdateItemNotes
    | SheetMoveItems
    | SheetRemoveItems
    | SheetUpdateItems

    | SheetAssignMod
    | SheetAssignBodyMod
    | SheetRemoveMod
    | SheetRemoveBodyMod
    | SheetAddSlots
    | SheetRemoveSlots
    | SheetUpdateSlots;

export const SheetItemActions = {
    addItem: (character: Character, item: ItemInitializer): AppThunkAction<SheetItemAction | ToastAction> =>
        async (dispatch, getState) => {
            const characterApi = getState().api.characters;
            const instanceId = getUniqueIdentifier();
            const placeholder = { ...item, instanceId, customSlots: [], mods: [], saved: false };

            const undo = () => {
                dispatch({ type: 'SHEET_REMOVE_ITEMS', character, instanceIds: [instanceId] });
                ToastDispatchables.toast(new ErrorToast(`Error adding ${item.name}.`), dispatch);
            }
            dispatch({ type: 'SHEET_ADD_ITEM', character, item: placeholder });

            try {
                const response = await characterApi.addItem(character.id, item.id);
                if (response.status == 'Success') {
                    dispatch({ type: 'SHEET_SAVE_ITEM', character, oldInstanceId: instanceId, newInstanceId: response.payload });
                    ToastDispatchables.toast(new InfoToast(`${item.name} added to inventory.`), dispatch);
                }
                else {
                    undo();
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
            }
            catch (e) {
                undo();
                ToastDispatchables.toast(new ErrorToast("Server error adding item."), dispatch);
                console.error(e);
            }
        },

    addItemRange: (character: Character, items: ItemInitializer[], successCallback: (id: string) => unknown): AppThunkAction<CharacterUpdated | SheetSet | ToastAction> =>
        async (dispatch, getState) => {
            const characterApi = getState().api.characters;

            try {
                const response = await characterApi.addItemRange(character.id, items.map(i => i.id));
                if (response.status == 'Error') {
                    ToastDispatchables.toast(new ErrorToast(`Error adding items to ${character.name}.`), dispatch);
                    return;
                }
                if (response.payload != null) {
                    dispatch({ type: 'CHARACTER_UPDATED', character: response.payload });
                    dispatch({ type: 'SHEET_SET', character: response.payload });
                }
                ToastDispatchables.toast(new SuccessToast("Items added."), dispatch);
                successCallback(character.id);
            }
            catch (e) {
                ToastDispatchables.toast(new ErrorToast("Server error adding items."), dispatch);
            }
        },

    updateCustomItemName: (character: Character, item: Item, newCustomName: string | undefined): AppThunkAction<SheetItemAction | ToastAction> =>
        async (dispatch, getState) => {
            const characterApi = getState().api.characters;
            const oldCustomName = item.customName;
            const oldVersion = { ...item };
            const newVersion = { ...item, customName: newCustomName };
            if (newCustomName == undefined || newCustomName.trim() == '') {
                delete newVersion.customName;
            }

            const undo = () => {
                dispatch({ type: 'SHEET_UPDATE_ITEM_NAME', character, itemInstanceId: item.instanceId, customName: oldCustomName });
                ToastDispatchables.toast(new ErrorToast(`Error updating ${item.name}.`), dispatch);
            }
            dispatch({ type: 'SHEET_UPDATE_ITEM_NAME', character, itemInstanceId: item.instanceId, customName: newVersion.customName });

            try {
                const response = await characterApi.updateItem(character.id, oldVersion, newVersion);
                if (response.status == 'Success') {
                    dispatch({ type: 'SHEET_SAVE_ITEM', character, oldInstanceId: item.instanceId, newInstanceId: item.instanceId });
                }
                else {
                    undo();
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
            }
            catch (e) {
                undo();
                ToastDispatchables.toast(new ErrorToast("Server error updating item name."), dispatch);
                console.error(e);
            }
        },

    updateCustomItemNotes: (character: Character, item: Item, newCustomNotes: string | undefined): AppThunkAction<SheetItemAction | ToastAction> =>
        async (dispatch, getState) => {
            const characterApi = getState().api.characters;
            const oldCustomNotes = item.customNotes;
            const update = { ...item, customNotes: newCustomNotes };
            const undo = () => {
                dispatch({ type: 'SHEET_UPDATE_ITEM_NOTES', character, itemInstanceId: item.instanceId, customNotes: oldCustomNotes });
                ToastDispatchables.toast(new ErrorToast(`Error updating ${item.name}.`), dispatch);
            }
            dispatch({ type: 'SHEET_UPDATE_ITEM_NOTES', character, itemInstanceId: item.instanceId, customNotes: newCustomNotes });

            try {
                const response = await characterApi.updateItem(character.id, item, update);
                if (response.status == 'Error') {
                    undo();
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
            }
            catch (e) {
                undo();
                ToastDispatchables.toast(new ErrorToast("Server error updating item notes."), dispatch);
                console.error(e);
            }
        },

    holdItem: (character: Character, item: Item, replaceItems: Item[] = []): AppThunkAction<SheetMoveItems | ToastAction> =>
        async (dispatch, getState) => {
            const characterApi = getState().api.characters;
            const undo = getMoveItemUndoFunction(character, item, replaceItems, dispatch);
            if (undo == undefined) {
                return;
            }

            let toDispatch: SheetMoveItems = { type: 'SHEET_MOVE_ITEMS', character, operationOne: { group: [item], collection: 'Held' } };
            if (replaceItems.any()) {
                toDispatch = { ...toDispatch, operationTwo: { group: replaceItems, collection: 'Loose' } };
            }
            dispatch(toDispatch);

            try {
                const replaceInstanceIds = replaceItems.map(ri => ri.instanceId);
                const response = await characterApi.holdItem(character.id, item.instanceId, replaceInstanceIds);
                if (response.status == 'Error') {
                    undo();
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
            }
            catch (e) {
                undo();
                ToastDispatchables.toast(new ErrorToast("Server error holding item."), dispatch);
                console.error(e);
            }
        },

    wearItem: (character: Character, item: Item, replaceItems: Item[] = []): AppThunkAction<SheetMoveItems | ToastAction> =>
        async (dispatch, getState) => {
            const characterApi = getState().api.characters;
            const undo = getMoveItemUndoFunction(character, item, replaceItems, dispatch);
            if (undo == undefined) {
                return;
            }

            let toDispatch: SheetMoveItems = { type: 'SHEET_MOVE_ITEMS', character, operationOne: { group: [item], collection: 'Worn' } };
            if (replaceItems.any()) {
                toDispatch = { ...toDispatch, operationTwo: { group: replaceItems, collection: 'Loose' } };
            }
            dispatch(toDispatch);
            try {
                const replaceInstanceIds = replaceItems.map(ri => ri.instanceId);
                const response = await characterApi.wearItem(character.id, item.instanceId, replaceInstanceIds);
                if (response.status == 'Error') {
                    undo();
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
            }
            catch (e) {
                undo();
                ToastDispatchables.toast(new ErrorToast("Server error wearing item."), dispatch);
                console.error(e);
            }
        },

    moveToLoose: (character: Character, item: Item): AppThunkAction<SheetMoveItems | ToastAction> =>
        async (dispatch, getState) => {
            const characterApi = getState().api.characters;
            const undo = getMoveItemUndoFunction(character, item, [], dispatch);
            if (undo == undefined) {
                return;
            }

            dispatch({ type: 'SHEET_MOVE_ITEMS', character, operationOne: { group: [item], collection: 'Loose' } });
            try {
                const response = await characterApi.moveToLoose(character.id, item.instanceId);
                if (response.status == 'Error') {
                    undo();
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
            }
            catch (e) {
                undo();
                ToastDispatchables.toast(new ErrorToast("Server error moving item."), dispatch);
                console.error(e);
            }
        },

    removeItem: (character: Character, item: Item): AppThunkAction<SheetItemAction | ToastAction> =>
        async (dispatch, getState) => {
            const characterApi = getState().api.characters;
            const undo = () => {
                dispatch({ type: 'SHEET_ADD_ITEM', character, item });
                ToastDispatchables.toast(new ErrorToast(`Error removing ${item.name}.`), dispatch);
            }
            dispatch({ type: 'SHEET_REMOVE_ITEMS', character, instanceIds: [item.instanceId] });

            try {
                const response = await characterApi.removeItem(character.id, item.instanceId);
                if (response.status == 'Success') {
                    ToastDispatchables.toast(new InfoToast(`${item.name} removed from inventory.`), dispatch);
                }
                else {
                    undo();
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
            }
            catch (e) {
                undo();
                ToastDispatchables.toast(new ErrorToast("Server error removing item."), dispatch);
                console.error(e);
            }
        },

    assignMod: (character: Character, item: Item, mod: Mod, slotId: string): AppThunkAction<SheetItemAction | ToastAction> =>
        async (dispatch, getState) => {
            const characterApi = getState().api.characters;
            const slottingItem = item.findSlottingItem(slotId);
            if (slottingItem == null) {
                ToastDispatchables.toast(new ErrorToast("No item found with that slot."), dispatch);
                return;
            }

            const undo = () => {
                dispatch({ type: 'SHEET_REMOVE_MOD', character, item: slottingItem, slotId });
                ToastDispatchables.toast(new ErrorToast(`Error assigning ${mod.name} to ${item.name}.`), dispatch);
            }
            dispatch({ type: 'SHEET_ASSIGN_MOD', character, item: slottingItem, mod, slotId });
            const updatedMod = { ...mod.initializer, assignedSlotId: slotId };
    
            try {
                const response = await characterApi.assignMod(character.id, slottingItem.instanceId, updatedMod);
                if (response.status == 'Error') {
                    undo();
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
            }
            catch (e) {
                undo();
                ToastDispatchables.toast(new ErrorToast("Server error assigning mod to item."), dispatch);
                console.error(e);
            }
        },

    assignBodyMod: (character: Character, mod: Mod, slotId: string): AppThunkAction<SheetItemAction | ToastAction> =>
        async (dispatch, getState) => {
            const characterApi = getState().api.characters;
            const undo = () => {
                dispatch({ type: 'SHEET_REMOVE_BODY_MOD', character, slotId });
                ToastDispatchables.toast(new ErrorToast(`Error assigning ${mod.name} to body.`), dispatch);
            }
            dispatch({ type: 'SHEET_ASSIGN_BODY_MOD', character, mod, slotId });
            const updatedMod = { ...mod.initializer, assignedSlotId: slotId };

            try {
                const response = await characterApi.assignBodyMod(character.id, updatedMod);
                if (response.status == 'Error') {
                    undo();
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
            }
            catch (e) {
                undo();
                ToastDispatchables.toast(new ErrorToast("Server error assigning body mod."), dispatch);
                console.error(e);
            }
        },

    addAndAssignMod: (character: Character, item: Item, modInitializer: ModInitializer, slotId: string): AppThunkAction<SheetItemAction | ToastAction | SiteSetLoading> =>
        async (dispatch, getState) => {             
            const characterApi = getState().api.characters;   
            const updatedModInitializer: OwnedModInitializer = { ...modInitializer, instanceId: getUniqueIdentifier(), assignedSlotId: slotId, customSlots: [], mods: [], saved: false };
            const mod = new Mod(updatedModInitializer);
            const slottingItem = item.findSlottingItem(slotId);
            if (slottingItem == null) {
                ToastDispatchables.toast(new ErrorToast("No item found with that slot."), dispatch);
                return;
            }

            const undo = () => {
                dispatch({ type: 'SHEET_REMOVE_MOD', character, item: slottingItem, slotId });
                dispatch({ type: 'SHEET_REMOVE_ITEMS', character, instanceIds: [updatedModInitializer.instanceId] });
                ToastDispatchables.toast(new ErrorToast(`Error adding and assigning ${mod.name} to ${slottingItem.name}.`), dispatch);
            }

            dispatch({ type: 'SHEET_ASSIGN_MOD', character, item: slottingItem, mod, slotId });
            try {
                const assignModResponse = await characterApi.addAndAssignMod(character.id, slottingItem.instanceId, updatedModInitializer);
                if (assignModResponse.status == 'Error') {
                    undo();
                }
                else {
                    dispatch({ type: 'SHEET_SAVE_ITEM', character, oldInstanceId: updatedModInitializer.instanceId, newInstanceId: assignModResponse.payload });
                }
            }
            catch(e) {
                undo();
                ToastDispatchables.toast(new ErrorToast("Server error adding and assigning mod to item."), dispatch);
                console.error(e);
            }
        },

    addAndAssignBodyMod: (character: Character, modInitializer: ModInitializer, slotId: string): AppThunkAction<SheetItemAction | ToastAction | SiteSetLoading> => 
        async (dispatch, getState) => {
            const characterApi = getState().api.characters;
            const updatedModInitializer: OwnedModInitializer = { ...modInitializer, instanceId: getUniqueIdentifier(), assignedSlotId: slotId, customSlots: [], mods: [], saved: false };
            const mod = new Mod(updatedModInitializer);
            const undo = () => {
                dispatch({ type: 'SHEET_REMOVE_BODY_MOD', character, slotId });
            }
            dispatch({ type: 'SHEET_ASSIGN_BODY_MOD', character, mod, slotId });
            try {
                const assignModResponse = await characterApi.addAndAssignBodyMod(character.id, updatedModInitializer);
                if (assignModResponse.status == 'Error') {
                    undo();
                }
                else {
                    dispatch({ type: 'SHEET_SAVE_ITEM', character, oldInstanceId: updatedModInitializer.instanceId, newInstanceId: assignModResponse.payload });
                }
            }
            catch(e) {
                undo();
                ToastDispatchables.toast(new ErrorToast("Server error adding and assigning body mod."), dispatch);
                console.error(e);
            }
        },

    removeMod: (character: Character, item: Item, mod: Mod): AppThunkAction<SheetItemAction | ToastAction> =>
        async (dispatch, getState) => {
            const characterApi = getState().api.characters;
            const slotId = mod.assignedSlotId;
            if (slotId == undefined) {
                console.error('Attempt to remove an unassigned mod.');
                return;
            }

            const undo = () => {
                dispatch({ type: 'SHEET_ASSIGN_MOD', character, item, mod, slotId });
                ToastDispatchables.toast(new ErrorToast(`Error removing ${mod.name} from ${item.name}.`), dispatch);
            }
            
            dispatch({ type: 'SHEET_REMOVE_MOD', character, item, slotId });

            try {
                const response = await characterApi.removeMod(character.id, item.instanceId, mod.instanceId);
                if (response.status == 'Error') {
                    undo();
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
            }
            catch (e){
                undo();
                ToastDispatchables.toast(new ErrorToast("Server error removing mod from item."), dispatch);
                console.error(e);
            }
        },

    removeBodyMod: (character: Character, mod: Mod): AppThunkAction<SheetItemAction | ToastAction> =>
        async (dispatch, getState) => {
            const characterApi = getState().api.characters;
            const slotId = mod.assignedSlotId;
            if (slotId == undefined) {
                console.error("Attempt to remove an unassigned mod.");
                return;
            }

            const undo = () => {
                dispatch({ type: 'SHEET_ASSIGN_BODY_MOD', character, mod, slotId });
                ToastDispatchables.toast(new ErrorToast(`Error removing ${mod.name} from body.`), dispatch);
            }
            
            dispatch({ type: 'SHEET_REMOVE_BODY_MOD', character, slotId });

            try {
                const response = await characterApi.removeBodyMod(character.id, mod.instanceId);
                if (response.status == 'Error') {
                    undo();
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
            }
            catch (e) {
                undo();
                ToastDispatchables.toast(new ErrorToast("Server error removing body mod."), dispatch);
                console.error(e);
            }
        },

    addSlots: (character: Character, requests: AddItemSlotsRequest[]): AppThunkAction<SheetItemAction | ToastAction> =>
        async (dispatch, getState) => {
            const { api: { characters: characterApi } } = getState();

            for (let request of requests) {
                for (let slot of request.slots) {
                    slot.id = getUniqueIdentifier();
                }
            }
            const itemIds = requests.map(r => r.itemInstanceId)
            const slotIds = requests.mapMany(r => r.slots).map(s => s.id);

            const undo = () => {
                dispatch({ type: 'SHEET_REMOVE_SLOTS', character, itemIds, slotIds });
                ToastDispatchables.toast(new ErrorToast('Error updating item slots.'), dispatch);
            }

            dispatch({ type: 'SHEET_ADD_SLOTS', character, requests });

            try {
                const response = await characterApi.addSlots(character.id, requests);
                if (response.status == 'Error') {
                    undo();
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
                else {
                    dispatch({ type: 'SHEET_UPDATE_SLOTS', character, itemIds, updateIdResponses: response.payload });
                }
            }
            catch (e) {
                undo();
                ToastDispatchables.toast(new ErrorToast("Server error adding slots to item(s)."), dispatch);
                console.error(e);
            }
        },

    removeSlots: (character: Character, slots: ModSlot[]): AppThunkAction<SheetItemAction | ToastAction> =>
        async (dispatch, getState) => {
            const { api: { characters: characterApi } } = getState();

            const slotIds = slots.map(s => s.id);
            const affectedItems = character.inventory.filter(i => i.customSlots.map(cs => cs.id).intersection(slotIds).any());
            const itemIds = affectedItems.map(ai => ai.instanceId);
            const undoModAssignments: SheetAssignMod[] = [];
            const undoRequests: AddItemSlotsRequest[] = [];

            for (let item of affectedItems) {
                const mod = item.mods.find(m => slotIds.contains(m.assignedSlotId));
                if (mod?.assignedSlotId != null) {
                    undoModAssignments.push({ type: 'SHEET_ASSIGN_MOD', character, item, mod, slotId: mod.assignedSlotId })
                }

                const slots = item.customSlots.filter(cs => slotIds.contains(cs.id));
                undoRequests.push({
                    itemInstanceId: item.instanceId,
                    slots
                });
            }

            const undo = () => {
                dispatch({ type: 'SHEET_ADD_SLOTS', character, requests: undoRequests });

                //If a mod is assigned, reassign it.
                for (let undoModAssignment of undoModAssignments) {
                    dispatch(undoModAssignment);
                }
            }

            dispatch({ type: 'SHEET_REMOVE_SLOTS', character, itemIds, slotIds: slotIds });
            try {
                const response = await characterApi.removeSlots(character.id, slotIds);
                if (response.status == 'Error') {
                    undo();
                    ToastDispatchables.toast(new ErrorToast('Error removing item slot.'), dispatch);
                }
            }
            catch (e) {
                undo();
                ToastDispatchables.toast(new ErrorToast("Server error removing slots from item(s)."), dispatch);
                console.error(e);
            }
        }
}

type MoveDispatcher = (action: SheetMoveItems | ToastAction) => void;

/**
 * Creates a method that undoes an item move action.
 * @param character The character to create a move undo operation for.
 * @param item The item that was moved.
 * @param replaceItems The items replaced in the move.
 * @param dispatch A hook into redux the dispatch pipeline.
 * @returns A function that undoes an item move action.
 */
const getMoveItemUndoFunction = (character: Character, item: Item, replaceItems: Item[], dispatch: MoveDispatcher) => {
    const undoDestinationResponse = character.getItemCollection(item);
    if (undoDestinationResponse == undefined) {
        ToastDispatchables.toast(new ErrorToast('Move item not on character!'), dispatch);
        return;
    }
    const { collection} = undoDestinationResponse;

    //TODO: See if there is a way to keep this typing without repeating as much as is here.
    const itemPayload = { group: [item], collection: collection as NonContainerCollectionName };

    const toDispatch: SheetMoveItems = { type: 'SHEET_MOVE_ITEMS', character, operationOne: itemPayload }
    if (!replaceItems.any()) {
        return () => dispatch(toDispatch);
    }

    const replaceOperation = getMoveItemReplaceOperation(character, replaceItems, dispatch);
    return () => dispatch({ ...toDispatch, operationTwo: replaceOperation });
}

/**
 * Creates an operation for undoing the changes to items replaced in an item move action.
 * @param character The character to create a move undo operation for.
 * @param replaceItems The items replaced in the move.
 * @param dispatch A hook into redux the dispatch pipeline.
 * @returns A payload that reverses a move operation's changes to the replaced items.
 */
const getMoveItemReplaceOperation = (character: Character, replaceItems: Item[], dispatch: MoveDispatcher) => {
    let replaceDestination: NonContainerCollectionName | undefined;
    const replaceCollection = replaceItems.map(ri => ({
            item: ri,
            undoResponse: character.getItemCollection(ri)
        }))
        .filter(r => r.undoResponse != undefined);

    const replaceGroupItems = replaceCollection.map(r => r.item);
    const undoResponses = replaceCollection.map(rc => rc.undoResponse).filter<ItemCollectionInfo>(nonEmpty);

    for (let response of undoResponses) {
        if (undoResponses.any(other => other.collection != response.collection || other.container != response.container)) {
            ToastDispatchables.toast(new ErrorToast('Replacement items are in different locations.'), dispatch);
            return;
        }
    }

    return { group: replaceGroupItems, collection: replaceDestination as NonContainerCollectionName };
}