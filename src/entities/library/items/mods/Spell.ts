import { Item } from "../Item";
import { OwnedSpellInitializer } from "../ItemInitializers";
import { Mod } from "./Mod";

export function isSpell(item: Item): item is Spell {
    return item.type == 'Spell';
}

export class Spell extends Mod implements OwnedSpellInitializer {
    public constructor(initializer: OwnedSpellInitializer) {
        super(initializer);
        this.juice = initializer.juice;
        this.requiresAttention = initializer.requiresAttention;
    }

    public readonly type: 'Spell' = 'Spell';
    public readonly juice: number;
    public readonly requiresAttention: boolean;
}