import React from "react";
import { AmmoInitializer, CrudModInitializer } from "../../../../../entities/library/items/ItemInitializers";
import { ModInitializerEditor } from "../ModInitializerEditor";
import { AmmoStateSetter } from "./AmmoStateSetter";
import { ThemedCheckbox } from "../../../../../components/inputs/checkbox/ThemedCheckbox";

type Props<T extends AmmoInitializer, C extends CrudModInitializer<T>> = {
    initializer: C;
    stateSetter: AmmoStateSetter<T, C>;
}

export const AmmoInitializerEditor = <T extends AmmoInitializer, C extends CrudModInitializer<T>>(props: Props<T, C>) => {
    const { rangeOverride } = props.initializer;
    const rangeOverrideDisabled = rangeOverride == undefined;
    return (
        <>
            <ModInitializerEditor initializer={props.initializer} stateSetter={props.stateSetter} />

            <fieldset className="form-group">
                <legend>Ammo Properties</legend>
                <div className="form-field">
                    <label>Range Mod</label>
                    <input type='number' value={props.initializer.rangeMod ?? 0} onChange={props.stateSetter.updateRangeMod.bind(props.stateSetter)} />
                </div>
                <div className="form-field">
                    <label>Range Override</label>
                    <input type='number' disabled={rangeOverrideDisabled} value={props.initializer.rangeOverride ?? 0} onChange={props.stateSetter.updateRangeOverride.bind(props.stateSetter)} />
                    <br />
                    <label>Disabled?</label>
                    <ThemedCheckbox checked={rangeOverrideDisabled} setChecked={(checked) => props.stateSetter.setRangeOveride(checked ? undefined : 0)} />
                </div>
            </fieldset>
        </>
    );
}