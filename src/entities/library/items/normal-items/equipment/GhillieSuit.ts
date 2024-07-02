import { SkillValueModifier } from "../../../../character-modifiers/ValueModifier";
import { Character } from "../../../../characters/Character";
import { Item } from "../../Item";
import { OwnedItemInitializer } from "../../ItemInitializers";

class GhillieSuiteSubterfugeValueModifier extends SkillValueModifier {
    public readonly source = 'Ghillie Suit';
    public readonly valueType: 'Subterfuge' = 'Subterfuge';

    public modify(character: Character): number {
        return 1;
    }
}

export class GhillieSuite extends Item {
    public constructor(initializer: OwnedItemInitializer) {
        super(initializer);
        this.valueModifiers = [
            new GhillieSuiteSubterfugeValueModifier()
        ];
    }
}