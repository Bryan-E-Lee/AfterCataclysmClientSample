import React from "react";
import { CrudItemInitializer, WeaponInitializer } from "../../../../entities/library/items/ItemInitializers";
import { ItemStateSetter } from "../ItemStateSetter";

export class WeaponStateSetter<I extends WeaponInitializer, C extends CrudItemInitializer<I>> extends ItemStateSetter<I, C> {
    public updateWeaponType(weaponType: string): void {
        this.setState(state => ({ ...state, weaponType }));
    }

    public updateHands(e: React.ChangeEvent<HTMLInputElement>): void {
        this.setState(state => ({ ...state, hands: parseInt(e.target.value) }));
    }

    public updateRange(e: React.ChangeEvent<HTMLInputElement>): void {
        this.setState(state => ({ ...state, range: parseInt(e.target.value) }));
    }
}