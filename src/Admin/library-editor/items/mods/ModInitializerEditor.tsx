import React from "react";
import { ItemInitializerEditor } from "../ItemInitializerEditor";
import { ModStateSetter } from "./ModStateSetter";
import { SlotTypeEditor } from "../item-field-editors/SlotTypeEditor";
import { MultiSelect } from "../../../../components/inputs/selects/multiselect/MultiSelect";
import { CrudModInitializer, ModInitializer } from "../../../../entities/library/items/ItemInitializers";
import { AdminState } from "../../../store/stores/AdminState";
import { useSelector } from "react-redux";
import { DamageSuiteEditor } from "../../common/quantified-damage/DamageSuiteEditor";
import { StringListEditor } from "../../StringListEditor";
import { ThemedCheckbox } from "../../../../components/inputs/checkbox/ThemedCheckbox";
import { CustomDamageTextsReminder } from "./CustomDamageTextsReminder";

type Props<T extends ModInitializer, C extends CrudModInitializer<T>> = {
    initializer: C;
    stateSetter: ModStateSetter<T, C>;
}

export const ModInitializerEditor = <T extends ModInitializer, C extends CrudModInitializer<T>>(props: Props<T, C>) => {
    const { initializer, stateSetter } = props;
    const tags = useSelector((state: AdminState) => state.library.tags);
    const tagOptions = tags.map(t => ({ name: t, value: t }));
    return (
        <>
            <ItemInitializerEditor initializer={initializer}
                stateSetter={stateSetter} />

            <fieldset className="form-group">
                <legend>Mod Properties</legend>
                <SlotTypeEditor mod={initializer} 
                    onChange={stateSetter.updateSlotType.bind(stateSetter)} />

                <div className="form-field">
                    <label>Inherits Hand Triggers?</label>
                    <ThemedCheckbox checked={initializer.inheritsHandTriggers} setChecked={stateSetter.updateInheritsHandTriggers.bind(stateSetter)} />
                </div>

                <div className="form-field">
                    <label>Damage Suite</label>
                    <DamageSuiteEditor damageSuite={initializer.damageSuite || []}
                        update={stateSetter.updateDamageSuite.bind(stateSetter)} />
                </div>

                <div className="form-fields">
                    <label>Custom Damage Texts</label>
                    <StringListEditor texts={initializer.customDamageTexts} update={stateSetter.updateCustomDamageTexts.bind(stateSetter)} />
                    <CustomDamageTextsReminder />
                </div>

                <div className="form-field">
                    <label>Assignable-To Tags</label>
                    <div className="form-field">
                        <label>Existing Tags</label>
                        <MultiSelect options={tagOptions} selections={initializer.assignableToTags}
                            onChange={stateSetter.updateAssignableToTags.bind(stateSetter)} />
                    </div>
                    <div className="form-field">
                        <label>Create New</label>
                        <StringListEditor texts={initializer.assignableToTags} update={stateSetter.updateNewAssignableToTags.bind(stateSetter)} />
                    </div>
                </div>
            </fieldset>
        </>
    );
}