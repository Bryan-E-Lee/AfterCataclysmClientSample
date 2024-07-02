import { QuantifiedDamage } from "../categorization/QuantifiedDamage";
import { HandTrigger } from "../rolls/HandTrigger";
import { SkillName } from "../library/skills/SkillMap";
import { Ability } from "./Ability";

export type ActiveAbility = Ability & {
    abilityType: 'ActiveAbility';
    juices: boolean;
    dejuices: boolean;
    range?: number;
    hands?: number;
    skillsUsed: SkillName[];
    damageSuite?: QuantifiedDamage[];
    customDamageTexts: string[];
    handTriggers?: HandTrigger[];
}

export function isActiveAbility(ability: Ability): ability is ActiveAbility {
    return ability.abilityType == 'ActiveAbility';
}