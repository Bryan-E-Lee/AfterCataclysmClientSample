import { Character } from "../../characters/Character";
import { HealthValueModifier } from "../../character-modifiers/ValueModifier";
import { Skill, OwnedSkillInitializer } from "./Skill";

class AthleticsHealthValueModifier extends HealthValueModifier {
    public readonly source = 'Athletics';

    public modify(character: Character): number {
        const skills = character.skills.collection.filter(s => s.name == 'Athletics' || s.name == 'Melee');
        const athletics = skills.find(s => s.name == 'Athletics')?.adjustedLevel || 1;
        const melee = skills.find(s => s.name == 'Melee')?.adjustedLevel || 1;

        if (melee > athletics) {
            return 0;
        }

        let athleticsHealthMod = 2;
        if (athletics >= 6) {
            athleticsHealthMod = 3;
        }
        if (athletics >= 10) {
            athleticsHealthMod = 4;
        }
        return athletics * athleticsHealthMod;
    }
}

export class AthleticsSkill extends Skill {
    public constructor(initializer: OwnedSkillInitializer) {
        super(initializer);
        this.valueModifiers = [
            new AthleticsHealthValueModifier()
        ];
    }
}