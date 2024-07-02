import React from "react";
import { CrudModInitializer, SpellInitializer } from "../../../../../entities/library/items/ItemInitializers";
import { ModInitializerEditor } from "../ModInitializerEditor";
import { SpellStateSetter } from "./SpellStateSetter";
import { ThemedCheckbox } from "../../../../../components/inputs/checkbox/ThemedCheckbox";

type Props<T extends SpellInitializer, C extends CrudModInitializer<T>> = {
    initializer: C;
    stateSetter: SpellStateSetter<T, C>;
}

export const SpellInitializerEditor = <T extends SpellInitializer, C extends CrudModInitializer<T>>(props: Props<T, C>) => {
    const { initializer, stateSetter } = props;
    return (
        <>
            <ModInitializerEditor initializer={initializer} stateSetter={stateSetter} />
            
            <fieldset className="form-group">
                <legend>Spell Properties</legend>
                <div className="form-field">
                    <label>Juice</label>
                    <input type='number' min={0} value={initializer.juice}
                        onChange={stateSetter.updateJuice.bind(stateSetter)} />
                </div>
                <div className="form-field">
                    <label>Requires Attention?</label>
                    &nbsp;
                    <ThemedCheckbox checked={initializer.requiresAttention} setChecked={stateSetter.updateRequiresAttention.bind(stateSetter)} />
                </div>
            </fieldset>
        </>
    );
}