import { CharacterAbility } from '../../../abilities/Ability';
import { HandTrigger } from '../../../rolls/HandTrigger';
import { Item, ItemSortableProperty } from '../Item';
import { OwnedWeaponInitializer, unguardedIsAmmo, unguardedIsSpell, WeaponInitializer } from '../ItemInitializers';
import { Ammo, isAmmo } from '../mods/Ammo';
import { Spell, isSpell } from '../mods/Spell';

export const BasicWeaponTypes = [
    'Dagger',
    'Wrist Launcher',
    'One-Handed Melee',
    'Two-Handed Melee',
    'Blaster',
    'Handgun',
    'Shotgun',
    'Spewer',
    'Rifle',
    'Energy Rifle',
    'Heavy Weapon',
    'Mine',
    'Bomb Satchel',
    'Grenade Launcher',
    'Rocket Launcher'
];

export function isWeapon(item: any): item is Weapon {
    return item?.type == 'Weapon';
}

export type WeaponSortableProperty = ItemSortableProperty
                                    | 'Hands'
                                    | 'Range';

export class Weapon extends Item implements OwnedWeaponInitializer {
    public constructor(initializer: OwnedWeaponInitializer) {
        super(initializer);
        this.weaponType = initializer.weaponType;
        this.hands = initializer.hands;
        this.range = initializer.range;
    }

    public readonly type: 'Weapon' = 'Weapon';
    public readonly weaponType: string;
    public readonly hands: number;
    public readonly range: number;

    public get ammoText(): string {
        return this.slots.mapMany(s => s.slotTypes)
            .sort()
            .join(', ');
    }

    public static SortWeaponInitializers = (property: WeaponSortableProperty) =>
        (weapon1: WeaponInitializer, weapon2: WeaponInitializer) => {
            switch(property) {
                case 'Hands':
                    return Item.SortByNumber(weapon1.hands, weapon2.hands);
                case 'Range':
                    return Item.SortByNumber(weapon1.range, weapon2.range);
                default:
                    const itemSorter = Item.Sort(property);
                    return itemSorter(weapon1, weapon2);
            }
        }

    public get displayActions(): CharacterAbility[] {
        return [
            ...this.attacks,
            ...this.spells, 
            ...this.mods.filter(m => !unguardedIsAmmo(m)).mapMany(m => m.getActions(this))
        ].unique(a => a.id);
    }

    public get attacks(): CharacterAbility[] {
        const ammos = this.containedItems.filter<Ammo>(isAmmo);
        const myTriggers = this.handTriggers.map(ht => <HandTrigger>({ ...ht, source: this.name }));
        return ammos.map(ammo => {
            let handTriggers: HandTrigger[] = [];
            if (ammo.inheritsHandTriggers) {
                handTriggers = myTriggers.concat(ammo.handTriggers);
            }
            const range = ammo.rangeOverride ?? (this.range + ammo.rangeMod);
            return {
                id: ammo.instanceId,
                icon: ammo.iconElement,
                type: 'Attack',
                name: ammo.displayName,
                sourceId: ammo.instanceId,
                source: this.displayName,
                description: ammo.description,
                sourceDescription: this.description,
                range,
                damageSuite: ammo.damageSuite,
                customDamageTexts: ammo.customDamageTexts,
                handTriggers,
                tags: ammo.tags
            };
        })
    }

    public get spells(): CharacterAbility[] {
        const spells = this.mods.filter<Spell>(isSpell);
        return spells.mapMany(spell => spell.actions.map(spellAction => {
            let handTriggers: HandTrigger[] = [];
            if (spell.inheritsHandTriggers) {
                handTriggers = spellAction.handTriggers ?? []; //Spells do not use the weapon's triggers.
            }
            return ({
                id: spell.instanceId,
                icon: spell.iconElement,
                type: spellAction.type,
                name: spellAction.name,
                sourceId: spell.instanceId,
                source: this.displayName,
                description: spellAction.description,
                sourceDescription: this.description,
                range: spellAction.range,
                juice: spell.juice,
                requiresAttention: spell.requiresAttention,
                damageSuite: spellAction.damageSuite,
                customDamageTexts: [...spell.customDamageTexts, ...spellAction.customDamageTexts],
                handTriggers,
                tags: spellAction.tags
            });
        }));
    }
}