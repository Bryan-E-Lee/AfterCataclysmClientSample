import { JuiceValueModifier } from "../../character-modifiers/ValueModifier";
import { OwnedSkillInitializer } from "./Skill";
import { SlotChangingSkill } from "./SlotChangingSkill";

class ChemistryJuiceValueModifier extends JuiceValueModifier {
    public readonly source = 'Chemistry';
}

export class ChemistrySkill extends SlotChangingSkill {
    public constructor(initializer: OwnedSkillInitializer) {
        super(initializer);
        this.valueModifiers = [
            new ChemistryJuiceValueModifier()
        ];
    }

    protected readonly level4SlotAbilityId = 'd03740cd-aebc-44b1-865b-43b25853c240';
    protected readonly level8SlotAbilityId = '73082eb3-b9e5-419a-92e3-e02a89a3b368';
    protected readonly itemTriggerSlotType = 'Chemistry';
    protected readonly customSlotTypes = [this.itemTriggerSlotType];
}