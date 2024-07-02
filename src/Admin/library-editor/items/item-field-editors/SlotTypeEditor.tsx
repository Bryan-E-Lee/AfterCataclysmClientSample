import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SingleSelect } from "../../../../components/inputs/selects/singleselect/SingleSelect";
import { ModInitializer } from "../../../../entities/library/items/ItemInitializers";
import { AdminState } from "../../../store/stores/AdminState";

type Props = {
    mod: ModInitializer;
    index?: number;
    onChange: (slotType: string) => any;
}

export const SlotTypeEditor: React.FC<Props> = (props: Props) => {
    const slotTypes = useSelector((app: AdminState) => app.library.slotTypes);
    const slotTypeOptions = slotTypes.map(st => ({ name: st, value: st }));
    let nameKey = props.mod.id;
    if (props.index != null) {
        nameKey += `-${props.index}`;
    }
    nameKey += '-slot-type';
    const [useExisting, setUseExisting] = useState(true);
    return (
        <div className="form-field">
            <label>Slot Type</label>
            <div className="form-field">
                <input type="radio" name={nameKey} checked={useExisting}
                    onChange={(e) => setUseExisting(e.target.checked)} />
                <label>Use Existing</label>
                <div>
                    <SingleSelect filterable options={slotTypeOptions} disabled={!useExisting} selection={props.mod.slotType}
                        onChange={(selection) => props.onChange(selection)}>
                    </SingleSelect>
                </div>
            </div>
            <div className="form-field">
                <input type="radio" name={nameKey} checked={!useExisting}
                    onChange={(e) => setUseExisting(!e.target.checked)} />
                <label>Create New</label>
                <input type="text" value={props.mod.slotType} disabled={useExisting}
                    onChange={(e) => props.onChange(e.target.value)} />
            </div>
        </div>
    )
}