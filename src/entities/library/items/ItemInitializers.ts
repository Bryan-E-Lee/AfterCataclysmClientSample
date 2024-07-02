import { ActiveAbility } from "../../abilities/ActiveAbility";
import { PassiveAbility } from "../../abilities/PassiveAbility";
import { ReactiveAbility } from "../../abilities/ReactiveAbility";
import { QuantifiedDamage } from "../../categorization/QuantifiedDamage";
import { SortedSet } from "../../data-structures/SortedSet";
import { HandTrigger } from "../../rolls/HandTrigger";
import { OwnedContainerReference, OwnedItemReference, OwnedModReference } from "../../Ownership";
import { RecordStatus } from "../../RecordStatus";
import { SkillName } from "../skills/SkillMap";
import { SkillRequirement } from "../skills/SkillRequirement";
import { ExplicitItemKey } from "./ExplicitItemMap";
import { ModSlot } from "./mods/ModSlot";

export type WeaponAffectingModType = 'Ammo' | 'Spell';
export type ModTypeValue = 'Mod' | 'Body' | WeaponAffectingModType;
export type ItemTypeValue = 'Item' | 'Weapon' | 'Container' | ModTypeValue;
export type ItemCategoryValue = ItemTypeValue | 'Apparel';

export type ItemInitializer = {
    id: string;
    name: string;
    description: string;
    icon: string;
    type: ItemTypeValue;
    explicitType?: ExplicitItemKey;

    cost: number;
    weight: number;
    armor?: number;
    resilience?: number;
    handsUsedModifier: number;
    handsAvailableModifier: number;

    skillsUsed: SkillName[];
    skillRequirements: SkillRequirement[];
    handTriggers: HandTrigger[];
    
    actions: ActiveAbility[];
    reactions: ReactiveAbility[];
    passives: PassiveAbility[];

    wornOn: string[];
    slots: ModSlot[];
    blacklistTags: string[];
    tags: string[];

    recordStatus: RecordStatus;
}

export type CrudItemInitializer<TInitializer extends ItemInitializer> = TInitializer & { newTags: string[] };

export type OwnedItemInitializer = ItemInitializer & Omit<OwnedItemReference, 'mods'> & {
    customName?: string;
    customNotes?: string;
    customSlots: ModSlot[];
    mods: OwnedModInitializer[];
}

export function createUnknownItemInitializer(initializer: OwnedItemInitializer, reference: OwnedItemReference, set: SortedSet<ItemInitializer>): OwnedItemInitializer {
    if (isWeaponInitializer(initializer)) {
        return createOwnedWeaponInitializer(initializer, reference, set);
    }
    if (isContainerInitializer(initializer)) {
        return createOwnedContainerInitializer(initializer, <OwnedContainerReference>reference, set);
    }
    if (isOwnedAmmoInitializer(initializer)) {
        return createOwnedAmmoInitializer(initializer, reference, set);
    }
    if (isOwnedSpellInitializer(initializer)) {
        return createOwnedSpellInitializer(initializer, reference, set);
    }
    if (isOwnedModInitializer(initializer)) {
        return createOwnedModInitializer(initializer, reference, set);
    }
    return createOwnedItemInitializer(initializer, reference, set);
}

export function createOwnedItemInitializer(initializer: ItemInitializer, reference: OwnedItemReference, set: SortedSet<ItemInitializer>): OwnedItemInitializer {
    return {
        ...initializer,
        ...reference,
        type: 'Item',
        mods: getOwnedModInitializersFromModReferences(reference.mods, set)
    };
}

function getOwnedModInitializersFromModReferences(references: OwnedModReference[], set: SortedSet<ItemInitializer>): OwnedModInitializer[] {
    return references
        .filter(r => set.containsKey(r.id))
        .map(r => createOwnedModInitializer(set.get<ModInitializer>(r.id, isModInitializer)!, r, set));
}

export type WeaponInitializer = ItemInitializer & {
    type: 'Weapon';
    weaponType: string;
    hands: number;
    range: number;
}

export type OwnedWeaponInitializer = WeaponInitializer &  Omit<OwnedItemInitializer, 'type'>;

export function isWeaponInitializer(initializer: ItemInitializer): initializer is WeaponInitializer {
    return initializer.type == 'Weapon';
}

export function isOwnedWeaponInitializer(initializer: OwnedItemInitializer): initializer is OwnedWeaponInitializer {
    return initializer.type == 'Weapon';
}

export function createOwnedWeaponInitializer(initializer: WeaponInitializer, reference: OwnedItemReference, set: SortedSet<ItemInitializer>): OwnedWeaponInitializer {
    return {
        ...initializer,
        ...reference,
        type: 'Weapon',
        mods: getOwnedModInitializersFromModReferences(reference.mods, set)
    };
}


export type ContainerInitializer = ItemInitializer & {
    allowedTags: string[];
}

export type OwnedContainerInitializer = ContainerInitializer & OwnedItemInitializer
                                    & Omit<OwnedContainerReference, 'items' | 'mods'>
                                    & {
                                        items: OwnedItemInitializer[];
                                    }

export function isContainerInitializer(initializer: ItemInitializer): initializer is ContainerInitializer {
    return initializer.type == 'Container';
}

export function isOwnedContainerInitializer(initializer: OwnedItemInitializer): initializer is OwnedContainerInitializer {
    return initializer.type == 'Container';
}

export function createOwnedContainerInitializer(initializer: ContainerInitializer, reference: OwnedContainerReference, set: SortedSet<ItemInitializer>): OwnedContainerInitializer {
    return {
        ...initializer,
        ...reference,
        type: 'Container',
        mods: getOwnedModInitializersFromModReferences(reference.mods, set),
        items: reference.items
            .filter(i => set.containsKey(i.id))
            .map(i => createUnknownItemInitializer(set.get(i.id)!, i, set))
    };
}


export type ModInitializer = ItemInitializer & {
    slotType: string;
    assignedSlotId?: string;
    handsUsedModifier: number;
    handsAvailableModifier: number;
    inheritsHandTriggers: boolean;
    damageSuite: QuantifiedDamage[];
    customDamageTexts: string[];
    assignableToTags: string[];
}

export type CrudModInitializer<TModInitializer extends ModInitializer> = CrudItemInitializer<TModInitializer> & { newAssignableToTags: string[] };

export type OwnedModInitializer = ModInitializer & OwnedItemInitializer & Omit<OwnedModReference, 'mods'>;

export function isModInitializer(initializer: ItemInitializer): initializer is ModInitializer {
    return initializer.type == 'Mod'
        || initializer.type == 'Ammo'
        || initializer.type == 'Spell';
}

export function isOwnedModInitializer(initializer: OwnedItemInitializer): initializer is OwnedModInitializer {
    return initializer.type == 'Mod'
        || initializer.type == 'Ammo'
        || initializer.type == 'Spell';
}

export function createOwnedModInitializer(initializer: ModInitializer, reference: OwnedModReference, set: SortedSet<ItemInitializer>): OwnedModInitializer {
    return {
        ...initializer,
        ...reference,
        type: initializer.type,
        mods: getOwnedModInitializersFromModReferences(reference.mods, set)
    };
}

export function unguardedIsAmmo(item: any): boolean {
    return item?.type == 'Ammo';
}

export type AmmoInitializer = ModInitializer & {
    type: 'Ammo';
    rangeMod?: number;
    rangeOverride?: number;
}

export type OwnedAmmoInitializer = Omit<OwnedModInitializer, 'type'> & AmmoInitializer;

export function isAmmoInitializer(initializer: ItemInitializer): initializer is AmmoInitializer {
    return unguardedIsAmmo(initializer);
}

export function isOwnedAmmoInitializer(initializer: OwnedItemInitializer): initializer is OwnedAmmoInitializer {
    return isAmmoInitializer(initializer);
}

export function createOwnedAmmoInitializer(initializer: AmmoInitializer, reference: OwnedModReference, set: SortedSet<ItemInitializer>): OwnedAmmoInitializer {
    return {
        ...initializer,
        ...reference,
        type: 'Ammo',
        mods: getOwnedModInitializersFromModReferences(reference.mods, set)
    };
}


export type SpellInitializer = ModInitializer & {
    type: 'Spell',
    juice: number;
    requiresAttention: boolean;
}

export type OwnedSpellInitializer = SpellInitializer & Omit<OwnedModInitializer, 'type'>;

export function unguardedIsSpell(item: any): boolean {
    return item?.type == 'Spell';
}

export function isSpellInitializer(initializer: ItemInitializer): initializer is SpellInitializer {
    return unguardedIsSpell(initializer);
}

export function isOwnedSpellInitializer(initializer: OwnedItemInitializer): initializer is OwnedSpellInitializer {
    return isSpellInitializer(initializer);
}

export function createOwnedSpellInitializer(initializer: SpellInitializer, reference: OwnedModReference, set: SortedSet<ItemInitializer>): OwnedSpellInitializer {
    return {
        ...initializer,
        ...reference,
        type: 'Spell',
        mods: getOwnedModInitializersFromModReferences(reference.mods, set)
    }
}


export type UnknownItemInitializer = ItemInitializer
    | ContainerInitializer
    | WeaponInitializer
    | ModInitializer
    | AmmoInitializer
    | SpellInitializer;