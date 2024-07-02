import { Skill } from "./Skill";

export const FilterSkillsForJuice = (skill: Skill) => {
    return skill.name == 'Chemistry'
        || skill.name == 'Electronics'
        || skill.name == 'Machinery'
        || skill.name == 'Medicine';
}