import { GhillieSuite } from "./normal-items/equipment/GhillieSuit";
import { PoweredExoskeleton } from "./normal-items/equipment/PoweredExoskeleton";

export const ExplicitItemMap = {
    'Ghillie Suit': GhillieSuite,
    'Powered Exoskeleton': PoweredExoskeleton
};

export type ExplicitItemKey = keyof typeof ExplicitItemMap;

export type ExplicitItemType = typeof ExplicitItemMap[ExplicitItemKey];