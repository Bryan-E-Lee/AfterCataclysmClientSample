import { QuantifiedDamage } from "../../../../../entities/categorization/QuantifiedDamage";
import { CrudModInitializer, SpellInitializer } from "../../../../../entities/library/items/ItemInitializers";
import { ModStateSetter } from "../ModStateSetter";

export class SpellStateSetter<I extends SpellInitializer, C extends CrudModInitializer<I>> extends ModStateSetter<I, C> {
    public updateJuice(e: React.ChangeEvent<HTMLInputElement>): void {
        this.setState(state => ({ ...state, juice: parseInt(e.target.value) }));
    }

    public updateRequiresAttention(requiresAttention: boolean): void {
        this.setState(state => ({ ...state, requiresAttention }));
    }

    public updateDamageSuite(damageSuite: QuantifiedDamage[]): void {
        this.setState(state => ({ ...state, damageSuite }));
    }
}