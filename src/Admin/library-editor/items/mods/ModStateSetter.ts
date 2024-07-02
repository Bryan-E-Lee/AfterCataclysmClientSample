import { QuantifiedDamage } from "../../../../entities/categorization/QuantifiedDamage";
import { CrudItemInitializer, ModInitializer } from "../../../../entities/library/items/ItemInitializers";
import { ItemStateSetter } from "../ItemStateSetter";

export class ModStateSetter<I extends ModInitializer, C extends CrudItemInitializer<I>> extends ItemStateSetter<I, C> {
    public updateInheritsHandTriggers(inheritsHandTriggers: boolean): void {
        this.setState(state => ({ ...state, inheritsHandTriggers }));
    }

    public updateDamageSuite(damageSuite: QuantifiedDamage[]): void {
        this.setState(state => ({ ...state, damageSuite }));
    }
    
    public updateCustomDamageTexts(customDamageTexts: string[]): void {
        this.setState(state => ({ ...state, customDamageTexts }));
    }

    public updateSlotType(slotType: string): void {
        this.setState(state => ({ ...state, slotType }));
    }

    public updateAssignableToTags(assignableToTags: string[]): void {
        this.setState(state => ({ ...state, assignableToTags }));
    }

    public updateNewAssignableToTags(newAssignableToTags: string[]): void {
        this.setState(state => ({ ...state, newAssignableToTags }));
    }
}