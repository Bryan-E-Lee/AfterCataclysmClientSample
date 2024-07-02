import { QuantifiedDamage } from "../categorization/QuantifiedDamage";
import { Ability } from "./Ability";

export type ReactiveAbility = Ability & {
    abilityType: 'ReactiveAbility';
    triggerCondition: string;
    juices: boolean;
    dejuices: boolean;
    range?: number;
    damageSuite?: QuantifiedDamage[];
    customDamageTexts: string[];
}

export function isReactive(ability: Ability): ability is ReactiveAbility {
    return ability.abilityType == 'ReactiveAbility';
}