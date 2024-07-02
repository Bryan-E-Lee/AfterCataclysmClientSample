import { ModInitializer } from "../ItemInitializers";

export interface ModSlotInitializer {
    addedBy?: string;
    slotTypes: string[];
}

export interface ModSlot extends ModSlotInitializer {
    id: string;
}

export const IsLegalModForSlot = (slot: ModSlot, mod: ModInitializer) => {
    if (!slot.slotTypes.any()) {
        return true;
    }
    return SlotTypesMatch(slot, mod);
}

export const SlotTypesMatch = (slot: ModSlot, mod: ModInitializer) => slot.slotTypes.intersection(mod.tags).any();

const SortSlotTypes = (st1: string, st2: string): number => st1.localeCompare(st2);

export const SortModSlots = (ms1: ModSlot, ms2: ModSlot) => {
    const quantitySort = ms2.slotTypes.length - ms1.slotTypes.length;
    if (quantitySort != 0) {
        return quantitySort;
    }

    const ms1SortedSlotTypes = ms1.slotTypes.sort(SortSlotTypes);
    const ms2SortedSlotTypes = ms2.slotTypes.sort(SortSlotTypes);
    for (let index = 0; index < ms1.slotTypes.length; index++) {
        const comparison = SortSlotTypes(ms1SortedSlotTypes[index], ms2SortedSlotTypes[index]);
        if (comparison != 0) {
            return comparison;
        }
    }

    return -1; //Perform a stable sort if they are identical.
}