import { CharacterAbility, PrimaryActionType } from '../../../abilities/Ability';
import { QuantifiedDamage } from '../../../categorization/QuantifiedDamage';
import { Character } from '../../../characters/Character';
import { Item } from '../Item';
import { ItemInitializer, ModInitializer, ModTypeValue, OwnedModInitializer } from '../ItemInitializers';

export function isMod(item: Item | ItemInitializer): item is Mod {
    const isModType = item.type == 'Mod'
        || item.type == 'Ammo'
        || item.type == 'Spell';
    const isOwnedItem = (item as Item).instanceId != undefined;
    return isModType && isOwnedItem;
}

export class Mod extends Item implements OwnedModInitializer {
    public constructor(initializer: OwnedModInitializer) {
        super(initializer);
        this.slotType = initializer.slotType;
        this.assignedSlotId = initializer.assignedSlotId;
        this.inheritsHandTriggers = initializer.inheritsHandTriggers;
        this.damageSuite = initializer.damageSuite;
        this.customDamageTexts = initializer.customDamageTexts;
        this.assignableToTags = initializer.assignableToTags;
    }

    public readonly type: ModTypeValue = 'Mod';
    public readonly slotType: string;
    public assignedSlotId?: string;
    public readonly inheritsHandTriggers: boolean;
    public readonly damageSuite: QuantifiedDamage[];
    public readonly customDamageTexts: string[];
    public readonly assignableToTags: string[];

    public get actionType(): PrimaryActionType {
        if (this.type == 'Ammo') {
            return 'Attack';
        }
        if (this.type == 'Spell') {
            return 'Spell';
        }
        return 'Feature';
    }

    public get initializer(): OwnedModInitializer {
        const { 
            sourcedActions,
            sourcedReactions,
            sourcedPassives,
            ...initializer
        } = {
            ...this,
            mods: this.mods.map(mod => mod.initializer)
        };
        return initializer;
    }

    public static FilterByName(mod: ModInitializer, check: string): boolean {
        return mod.name.toLowerCase()
            .indexOf(check.toLowerCase()) > -1;
    }

    public static IsLegalModForCharacter = (mod: ModInitializer, character: Character): boolean => {
        for (let skillRequirement of mod.skillRequirements) {
            const skill = character.skills.getByName(skillRequirement.name);
            if (skill == null) {
                continue;
            }
            if (skill.level < skillRequirement.level) {
                return false;
            }
        }
        return true;
    }

    public getActions(item: Item): CharacterAbility[] {
        return this.actions.map(action => ({
            ...action,
            type: this.actionType,
            source: item.name
        }));
    }

    public getReactions(item: Item): CharacterAbility[] {
        return this.reactions.map(reaction => ({
            ...reaction,
            type: this.actionType,
            source: item.name
        }));
    }

    public getPassives(item: Item): CharacterAbility[] {
        return this.passives.map(passive => ({
            ...passive,
            source: item.name
        }));
    }

    public canBeAssignedToTags(tags: string[]): boolean {
        return !tags.any()
            || this.assignableToTags.any(tag => tags.includes(tag));
    }

    public get assignableToTagText(): string {
        return this.assignableToTags.join(', ');
    }
}