import { OwnedSkillInitializer, Skill } from "./Skill";
import { SkillMap } from "./SkillMap";

export const SkillFactory = {
    CreateSkill: (initializer: OwnedSkillInitializer): Skill => new SkillMap[initializer.name](initializer)
}