import { SkillName } from "../library/skills/SkillMap";
import { RhetoricName } from "../library/socials/RhetoricMap";

export type ValueType = SkillName
    | RhetoricName
    | 'Health'
    | 'Wounds'
    | 'Juice'
    | 'Movement'
    | 'HordeSize';

export interface CharacterModifier {
    valueType: ValueType
}