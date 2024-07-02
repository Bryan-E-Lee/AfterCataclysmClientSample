import { HealthValueModifier } from "../../character-modifiers/ValueModifier";
import { Character } from "../../characters/Character";
import { OwnedSkillInitializer, Skill } from "./Skill";
import { SlotChangingSkill } from "./SlotChangingSkill";

class MeleeHealthValueModifier extends HealthValueModifier {
    public readonly source = 'Melee';

    public modify(character: Character): number {
        const skills = character.skills.collection.filter(s => s.name == 'Athletics' || s.name == 'Melee');
        const melee = skills.find(s => s.name == 'Melee')?.adjustedLevel || 1;
        const athletics = skills.find(s => s.name == 'Athletics')?.adjustedLevel || 1;

        if (athletics >= melee) {
            return 0;
        }

        let meleeHealthMod = 2;
        if (melee >= 6) {
            meleeHealthMod = 3;
        }
        if (melee >= 10) {
            meleeHealthMod = 4;
        }
        return melee * meleeHealthMod;
    }
}

export class MeleeSkill extends SlotChangingSkill {
    public constructor(initializer: OwnedSkillInitializer) {
        super(initializer);
        this.valueModifiers = [
            new MeleeHealthValueModifier()
        ];
    }
    
    protected readonly level4SlotAbilityId = '2222ef7e-96a2-4ae7-ba43-bc26432f9b76';
    protected readonly level8SlotAbilityId = 'c203b154-0e08-4567-8ff7-f7c13c8e2610';
    protected readonly itemTriggerSlotType = 'Melee';
    protected readonly customSlotTypes = [];
}