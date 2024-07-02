import { QuantifiedDamage } from "../categorization/QuantifiedDamage";
import { HandTrigger } from "../rolls/HandTrigger";
import { NamedEntity } from "../NamedEntity";


export type PrimaryActionType = 'Attack' | 'Spell' | 'Feature';
export type AbilityType = 'ActiveAbility' | 'ReactiveAbility' | 'PassiveAbility';

export type Ability = NamedEntity & {
    id: string;
    abilityType: AbilityType;
    type: PrimaryActionType;
    description: string;
    tags: string[];
}

export type CharacterAbility = {
    id: string;
    icon?: React.ReactNode;
    type: PrimaryActionType;
    name: string;
    sourceId?: string;
    source?: string;
    description: string;
    sourceDescription?: string;
    juices?: boolean;
    dejuices?: boolean;
    requiresAttention?: boolean;
    damageSuite?: QuantifiedDamage[];
    customDamageTexts?: string[];
    handTriggers?: HandTrigger[];
    range?: number;
    triggerCondition?: string;
    tags: string[];
}

export type AbilitiesByHandTrigger = {
    'Pair'?: CharacterAbility[];
    'Two Pair'?: CharacterAbility[];
    'Triple'?: CharacterAbility[];
    'Small Straight'?: CharacterAbility[];
    'Flush'?: CharacterAbility[];
    'Full House'?: CharacterAbility[];
    'Big Straight'?: CharacterAbility[];
    'Quad'?: CharacterAbility[];
    'Jackpot!'?: CharacterAbility[];
}

export function GetCharacterAbilityKey(ability: CharacterAbility) {
    return ability.id;
}