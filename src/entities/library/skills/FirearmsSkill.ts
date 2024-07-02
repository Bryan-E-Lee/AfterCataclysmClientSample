import { OwnedSkillInitializer, Skill } from "./Skill";
import { SlotChangingSkill } from "./SlotChangingSkill";

export class FirearmsSkill extends SlotChangingSkill {
    public constructor(initializer: OwnedSkillInitializer) {
        super(initializer);
    }
    
    protected readonly level4SlotAbilityId = 'dfedfc5f-942f-4be9-96be-cedb1040dafd';
    protected readonly level8SlotAbilityId = '65f447fc-c941-483e-8bf7-7af0e1287d39';
    protected readonly itemTriggerSlotType = 'Firearm';
    protected readonly customSlotTypes = [];
}