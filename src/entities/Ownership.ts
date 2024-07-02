import { IdentifiableEntity } from "./NamedEntity";
import { ModSlot } from "./library/items/mods/ModSlot";
import { SkillName } from "./library/skills/SkillMap";
import { RhetoricPriority } from "./library/socials/Rhetoric";

export type OwnedReference = IdentifiableEntity & {
    instanceId: string;
    saved: boolean;
}

export type OwnedItemReference = OwnedReference & {
    customName?: string;
    customNotes?: string;
    customSlots: ModSlot[];
    mods: OwnedModReference[];
}

export type OwnedContainerReference = OwnedItemReference & {
    items: OwnedItemReference[];
}

export type OwnedModReference = OwnedItemReference & {
    assignedSlotId?: string;
}

export type OwnedRhetoricReference = OwnedReference & {
    priority: RhetoricPriority;
    adjustment: number;
    override?: number;
}

export type OwnedSkillReference = OwnedReference & {
    name: SkillName;
    level: number;
    adjustment: number;
    override?: number;
}

export type OwnedMinionReference = OwnedReference & {
    customName?: string;
    customNotes?: string;
    currentHealth: number;
}

export type OwnedCompetencyReference = {
    id: string;
    isExpert: boolean;
    saved: boolean;
}

export const InstanceIdKeyGetter = (entity: OwnedReference) => entity.instanceId;