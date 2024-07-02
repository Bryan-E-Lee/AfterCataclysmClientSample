import { JuiceValueModifier } from "../../character-modifiers/ValueModifier";
import { OwnedSkillInitializer } from "./Skill";
import { SlotChangingSkill } from "./SlotChangingSkill";

class MachineryJuiceValueModifier extends JuiceValueModifier {
    public readonly source = 'Machinery';
}

export class MachinerySkill extends SlotChangingSkill {
    public constructor(initializer: OwnedSkillInitializer) {
        super(initializer);
        this.valueModifiers = [
            new MachineryJuiceValueModifier()
        ];
    }
    
    protected readonly level4SlotAbilityId = 'e7304566-1598-442f-aee8-3fb9f1c717c1';
    protected readonly level8SlotAbilityId = 'c48f17da-76f8-4123-ab99-35961b7586bf';
    protected readonly itemTriggerSlotType = 'Machinery';
    protected readonly customSlotTypes = [this.itemTriggerSlotType];
}