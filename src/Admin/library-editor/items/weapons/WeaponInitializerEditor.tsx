import React, { useState } from 'react';
import { SingleSelect } from '../../../../components/inputs/selects/singleselect/SingleSelect';
import { CrudItemInitializer, WeaponInitializer } from '../../../../entities/library/items/ItemInitializers';
import { BasicWeaponTypes } from '../../../../entities/library/items/weapons/Weapon';
import { ItemInitializerEditor } from '../ItemInitializerEditor';
import { WeaponStateSetter } from './WeaponStateSetter';

type Props<T extends WeaponInitializer, C extends CrudItemInitializer<T>> = {
    initializer: C;
    stateSetter: WeaponStateSetter<T, C>;
}

export const WeaponInitializerEditor = <T extends WeaponInitializer, C extends CrudItemInitializer<T>>(props: Props<T, C>) => {
    const [useExistingWeaponType, toggleUseExistingWeaponType] = useState(true);
    const weaponTypeOptions = BasicWeaponTypes.map(wt => ({ name: wt, value: wt }));
    return (
        <>
            <ItemInitializerEditor initializer={props.initializer} stateSetter={props.stateSetter} />

            <div className="form-field">
                <label>Weapon Type</label>
                <div className="form-field">
                    <input type="radio" name={`weapon-type-${props.initializer.id}`}
                        checked={useExistingWeaponType}
                        onChange={(e) => toggleUseExistingWeaponType(e.target.checked)} />
                    <label>Use Existing</label>
                    <SingleSelect filterable options={weaponTypeOptions} selection={props.initializer.weaponType}
                        onChange={(selection) => props.stateSetter.updateWeaponType(selection)}>    
                    </SingleSelect>
                </div>
                <div className="form-field">
                    <input type="radio" name={`weapon-type-${props.initializer.id}`}
                        checked={!useExistingWeaponType}
                        onChange={(e) => toggleUseExistingWeaponType(!e.target.checked)} />
                    <label>Create New</label>
                    <input type="text" value={props.initializer.weaponType || ''} disabled={useExistingWeaponType}
                        onChange={(e) => props.stateSetter.updateWeaponType(e.target.value)} />
                </div>
            </div>
            <div className="form-field">
                <label>Hands</label>
                <input type="number"
                    value={props.initializer.hands || 0}
                    onChange={props.stateSetter.updateHands.bind(props.stateSetter)} />
            </div>
            <div className="form-field">
                <label>Range</label>
                <input type="number"
                    value={props.initializer.range || 0}
                    onChange={props.stateSetter.updateRange.bind(props.stateSetter)} />
            </div>
        </>
    )
}