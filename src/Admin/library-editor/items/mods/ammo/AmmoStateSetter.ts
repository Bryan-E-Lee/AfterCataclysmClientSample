import React from "react";
import { AmmoInitializer, CrudModInitializer } from "../../../../../entities/library/items/ItemInitializers";
import { ModStateSetter } from "../ModStateSetter";

export class AmmoStateSetter<I extends AmmoInitializer, C extends CrudModInitializer<I>> extends ModStateSetter<I, C> {    
    public updateRangeMod(e: React.ChangeEvent<HTMLInputElement>): void {
        this.setState(state => ({ ...state, rangeMod: parseInt(e.target.value) }));
    }

    public updateRangeOverride(e: React.ChangeEvent<HTMLInputElement>): void {
        this.setState(state => ({ ...state, rangeOverride: parseInt(e.target.value) }));
    }

    public setRangeOveride(rangeOverride?: number): void {
        this.setState(state => ({ ...state, rangeOverride }));
    }
}