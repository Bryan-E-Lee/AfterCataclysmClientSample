import { JuiceValueModifier } from "../../character-modifiers/ValueModifier";
import { OwnedSkillInitializer } from "./Skill";
import { SlotChangingSkill } from "./SlotChangingSkill";

class ElectronicsJuiceValueModifier extends JuiceValueModifier {
    public readonly source = 'Electronics';
}

export class ElectronicsSkill extends SlotChangingSkill {
    public constructor(initializer: OwnedSkillInitializer) {
        super(initializer);
        this.valueModifiers = [
            new ElectronicsJuiceValueModifier()
        ]
    }
    
    protected readonly level4SlotAbilityId = 'b98f9d02-e17f-425d-87b7-0f3c10c4c523';
    protected readonly level8SlotAbilityId = '4f27b6f6-6a71-4362-bbd1-37077eb2155f';
    protected readonly itemTriggerSlotType = 'Electronics';
    protected readonly customSlotTypes = [this.itemTriggerSlotType];
}