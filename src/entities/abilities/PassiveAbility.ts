import { Ability } from "./Ability";

export type PassiveAbility = Ability & {
    abilityType: 'PassiveAbility';
}

export function isPassiveAbility(ability: Ability): ability is PassiveAbility {
    return ability.abilityType == 'PassiveAbility';
}