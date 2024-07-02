import { OwnedSkillInitializer, Skill } from "./Skill";
import { SlotChangingSkill } from "./SlotChangingSkill";

export class ExplosivesSkill extends SlotChangingSkill {
    public constructor(initializer: OwnedSkillInitializer) {
        super(initializer);
    }
    
    protected readonly level4SlotAbilityId = '8d200bff-9808-4eb2-b242-82961b8cf13b';
    protected readonly level8SlotAbilityId = '406cb64e-2131-410e-8779-f76ad0a5a1a2';
    protected readonly itemTriggerSlotType = 'Explosive';
    protected readonly customSlotTypes = [];
}