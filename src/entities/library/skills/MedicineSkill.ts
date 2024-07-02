import { JuiceValueModifier } from "../../character-modifiers/ValueModifier";
import { OwnedSkillInitializer } from "./Skill";
import { SlotChangingSkill } from "./SlotChangingSkill";

class MedicineJuiceValueModifier extends JuiceValueModifier {
    public readonly source = 'Medicine';
}

export class MedicineSkill extends SlotChangingSkill {
    public constructor(initializer: OwnedSkillInitializer) {
        super(initializer);
        this.valueModifiers = [
            new MedicineJuiceValueModifier()
        ];
    }
    
    protected readonly level4SlotAbilityId = 'd46a6dcb-c4d2-430a-bc1f-fee38eba3deb';
    protected readonly level8SlotAbilityId = 'ce118a6a-7219-44f9-a4fd-345da1cddd35';
    protected readonly itemTriggerSlotType = 'Medicine';
    protected readonly customSlotTypes = [this.itemTriggerSlotType];
}