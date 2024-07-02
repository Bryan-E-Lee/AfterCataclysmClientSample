import React, { useState } from "react";
import { ItemIconKey, ObjectIcons } from "../../../../components/icons";
import { SingleSelect } from "../../../../components/inputs/selects/singleselect/SingleSelect";

type Props = {
    initializer: { id: string, icon: string };
    onChange: (iconKey: ItemIconKey) => unknown;
}

export const IconEditor: React.FC<Props> = (props: Props) => {
    const nameKey = `${props.initializer.id}-icon`;
    const [useExisting, setUseExisting] = useState(true);
    const keys = Object.keys(ObjectIcons) as ItemIconKey[];
    keys.sort();
    const options = keys.filter(key => key != "GetIcon").map(key => ({
        name: (
            <><>{ObjectIcons.GetIcon(key)}</> - {key}</>
        ),
        value: key
    }));
    return (
        <div className="form-field">
            <label>Icon</label>
            <div className="form-field">
                <input type="radio" name={nameKey} checked={useExisting}
                    onChange={(e) => setUseExisting(e.target.checked)} />
                <label>Use Existing</label>
                <div>
                    <span style={{ fontSize: '32px' }}>
                        {ObjectIcons[props.initializer.icon || 'default']}
                    </span>
                    <SingleSelect filterable options={options} disabled={!useExisting}
                        selection={props.initializer.icon}
                        onChange={selection => props.onChange(selection as ItemIconKey)} />
                </div>
            </div>
            <div className="form-field">
                <input type="radio" name={nameKey} checked={!useExisting}
                    onChange={(e) => setUseExisting(!e.target.checked)} />
                <label>Create New (requires code update)</label>
                <input type="text" value={props.initializer.icon || 'default'} disabled={useExisting}
                    onChange={(e) => props.onChange(e.target.value as ItemIconKey /* False Cast */)} />
            </div>
        </div>
    );
}