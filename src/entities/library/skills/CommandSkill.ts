import { HordeSizeValueModifier } from "../../character-modifiers/ValueModifier";
import { Character } from "../../characters/Character";
import { Skill, OwnedSkillInitializer } from "./Skill";

class CommandHordeSizeModifier extends HordeSizeValueModifier {
    public readonly source = 'Command';

    public modify(character: Character): number {
        const filter = Skill.FindSkillFilter(this.source);
        const skill = character.skills.collection.find(filter);
        let hordeSize = 0;
        if (skill == null) {
            return hordeSize;
        }
        if (skill.adjustedLevel >= 2) {
            hordeSize++;
        }
        if (skill.adjustedLevel >= 6) {
            hordeSize++;
        }
        if (skill.adjustedLevel >= 10) {
            hordeSize++;
        }
        return hordeSize;
    }
}

export class CommandSkill extends Skill {
    public constructor(initializer: OwnedSkillInitializer) {
        super(initializer);
        this.valueModifiers = [
            new CommandHordeSizeModifier()
        ];
    }    
}