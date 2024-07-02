import { AddItemSlotsRequest } from "../../../apis/requests/AddItemSlotsRequest";
import { Character } from "../../characters/Character";
import { Item } from "../items/Item";
import { ModSlot } from "../items/mods/ModSlot";
import { Weapon, isWeapon } from "../items/weapons/Weapon";
import { AddSlotChangeRequest, IsAddSlotChangeRequest, IsRemoveSlotChangeRequest, RemoveSlotChangeRequest, Skill, SlotChangeRequest } from "./Skill";

export function isSlotChangingSkill(skill: Skill): skill is SlotChangingSkill {
    const untypedSkill = (<any>skill);
    return untypedSkill.isSlotChangingSkill != null && untypedSkill;
}

export abstract class SlotChangingSkill extends Skill {
    public get isSlotChangingSkill(): boolean {
        return true;
    }

    protected abstract customSlotTypes: string[];
    protected abstract itemTriggerSlotType: string;
    protected abstract level4SlotAbilityId: string;
    protected abstract level8SlotAbilityId: string;

    /**
     * Retreieves all slot changes to be applied to a character's items when this skill's level is changed.
     * @param newLevel The level that this skill will be changed to.
     * @param character The character that this skill belongs to.
     * @returns A collection of slot changes to apply to the character's items.
     */
    public getSlotChangesOnLevel(newLevel: number, character: Character): SlotChangeRequest {
        const itemsToAffect = this.getItemsToAffectOnLevel(character);
        if (newLevel > this.adjustedLevel) {
            const changes = this.getAddSlotChangesOnLevel(newLevel, itemsToAffect);
            if (changes.any()) {
                return { type: 'ADD', changes }
            }
        }
        else {
            const changes = this.getRemoveSlotChangesOnLevel(newLevel, itemsToAffect);
            if (changes.any()) {
                return { type: 'REMOVE', changes };
            }
        }
        return { type: 'NONE' };
    }

    /**
     * Retrieves all slot changes to be applied to an item when a new item is added to inventory.
     * @param item The item being added
     */
    public getSlotChangesForItem(item: Item): SlotChangeRequest {
        if (!item.saved || !isWeapon(item) || !item.tags.contains(this.itemTriggerSlotType)) {
            return { type: 'NONE' };
        }
        let changes: AddItemSlotsRequest[] = [];
        if (this.level >= 4) {
            changes = [...changes, ...this.getAddSlotChangesOnLevel(this.level, [item])];
        }
        if (this.level >= 8) {
            changes = [...changes, ...this.getAddSlotChangesOnLevel(this.level, [item])];
        }
        return { type: 'ADD', changes }
    }

    /**
     * Retrieves all slot changes to occur on load.
     * @param character The character to alter
     * @returns A collection of slot changes to apply to the character's items.
     */
    public getSlotChangesOnLoad(character: Character): SlotChangeRequest[] {
        const itemsToAffect = this.getItemsToAffectOnLevel(character);
        let changes: SlotChangeRequest[] = [];
        for (let weapon of itemsToAffect) {
            changes = [...changes, ...this.getSlotChangesForItemOnLoad(weapon)];
        }
        const addChanges = changes.filter<AddSlotChangeRequest>(IsAddSlotChangeRequest).mapMany(request => request.changes);
        const removeChanges = changes.filter<RemoveSlotChangeRequest>(IsRemoveSlotChangeRequest).mapMany(request => request.changes);
        
        changes = [];
        if (addChanges.any()) {
            changes.push({ type: 'ADD', changes: addChanges });
        }
        if (removeChanges.any()) {
            changes.push({ type: 'REMOVE', changes: removeChanges });
        }
        return changes;
    }

    private getItemsToAffectOnLevel(character: Character): Weapon[] {
        return character.allItems
            .filter<Weapon>(isWeapon)
            .filter(weapon => weapon.saved)
            .filter(weapon => weapon.tags.contains(this.itemTriggerSlotType));
    }

    private getAddSlotChangesOnLevel(newLevel: number, itemsToAffect: Weapon[]): AddItemSlotsRequest[] {
        let requests: AddItemSlotsRequest[] = [];
        if (this.adjustedLevel < 4 && newLevel >= 4) {
            requests = [...requests, ...this.getAddSlotChanges(itemsToAffect, this.level4SlotAbilityId)];
        }
        if (this.adjustedLevel < 8 && newLevel >= 8) {
            requests = [...requests, ...this.getAddSlotChanges(itemsToAffect, this.level8SlotAbilityId)];
        }
        return this.getAggregatedAddSlotRequests(requests);
    }

    private getRemoveSlotChangesOnLevel(newLevel: number, itemsToAffect: Weapon[]): ModSlot[] {
        let slots: ModSlot[] = [];
        if(this.adjustedLevel >= 4 && newLevel < 4) {
            slots = [...slots, ...this.getRemoveSlotChanges(itemsToAffect, this.level4SlotAbilityId)];
        }
        if (this.adjustedLevel >= 8 && newLevel < 8) {
            slots = [...slots, ...this.getRemoveSlotChanges(itemsToAffect, this.level8SlotAbilityId)];
        }
        return slots;
    }

    private getSlotChangesForItemOnLoad(weapon: Weapon): SlotChangeRequest[] {
        const slotChanges: SlotChangeRequest[] = [];
        const slotsAt4 = weapon.customSlots.filter(w => w.addedBy == this.level4SlotAbilityId).length;
        if (this.level >= 4 && slotsAt4 < weapon.hands) {
            const add: SlotChangeRequest = { type: 'ADD', changes: this.getAddSlotChanges([weapon], this.level4SlotAbilityId) };
            slotChanges.push(add);
        }
        else if (this.level < 4) {
            const remove: SlotChangeRequest = { type: 'REMOVE', changes: this.getRemoveSlotChanges([weapon], this.level4SlotAbilityId) };
            slotChanges.push(remove);
        }

        const slotsAt8 = weapon.customSlots.filter(w => w.addedBy == this.level8SlotAbilityId).length;
        if (this.level >= 8 && slotsAt8 < weapon.hands) {
            const add: SlotChangeRequest = { type: 'ADD', changes: this.getAddSlotChanges([weapon], this.level8SlotAbilityId) };
            slotChanges.push(add);
        }
        else if (this.level < 8) {
            const remove: SlotChangeRequest = { type: 'REMOVE', changes: this.getRemoveSlotChanges([weapon], this.level8SlotAbilityId) };
            slotChanges.push(remove);
        }
        return slotChanges;
    }

    protected getAggregatedAddSlotRequests(requests: AddItemSlotsRequest[]): AddItemSlotsRequest[] {
        const groups = requests.reduce((accum, curr) => {
            const key = curr.itemInstanceId;
            accum[key] = accum[key] || [];
            accum[key] = [...accum[key], ...curr.slots];
            return accum;
        }, {});
        let changes: AddItemSlotsRequest[] = [];
        for (let itemInstanceId in groups) {
            changes.push({
                itemInstanceId,
                slots: groups[itemInstanceId]
            })
        }
        return changes;
    }

    protected getAddSlotChanges(itemsToAffect: Weapon[], addedBy: string): AddItemSlotsRequest[] {
        const changes: AddItemSlotsRequest[] = [];
        for (let item of itemsToAffect) {
            const slots = [];
            const existingSlotCount = item.customSlots.filter(cs => cs.addedBy == addedBy).length;
            for (let handIndex = existingSlotCount; handIndex < item.hands; handIndex++) {
                slots.push({ id: '', addedBy, slotTypes: this.customSlotTypes });
            }
            changes.push({
                itemInstanceId: item.instanceId,
                slots
            });
        }
        return changes;
    }

    protected getRemoveSlotChanges(itemsToAffect: Weapon[], adderId: string) {
        return itemsToAffect
            .mapMany(item => item.customSlots)
            .filter(slot => slot.addedBy == adderId);
    }
}