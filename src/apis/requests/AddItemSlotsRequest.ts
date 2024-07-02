import { ModSlot } from "../../entities/library/items/mods/ModSlot";

export type AddItemSlotsRequest = {
    itemInstanceId: string;
    slots: ModSlot[];
}