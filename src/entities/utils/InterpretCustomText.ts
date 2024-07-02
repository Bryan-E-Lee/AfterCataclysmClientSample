import { Character } from "../characters/Character";
import { SkillName } from "../library/skills/SkillMap";

export type CustomDamageStringPropertyNames = "Empowerment";

export const InterpretCustomMarkdown = (text: string) => {
    
}

export const InterpretCustomText = (text: string, character?: Character, sourceId?: string) => {
    const tokens = text.split(".");
    const propertyName = tokens[0];
    switch (propertyName) {
        case "Empowerment":
            return InterpretEmpowerment(tokens, character);
        default:
            return text;
    }
}

const InterpretEmpowerment = (tokens: string[], character?: Character) => {
    const skillName = tokens[1] as SkillName;
    let skill = character?.skills.getByName(skillName);
    if (skill == null) {
        return `${skillName} Emp. Bonus`;
    }
    return `${skill.empowermentBonus} (${skillName} Emp. Bonus)`;
}