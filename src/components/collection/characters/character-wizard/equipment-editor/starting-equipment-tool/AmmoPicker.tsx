import React from "react";
import { Character } from "../../../../../../entities/characters/Character";
import { SortedSet } from "../../../../../../entities/data-structures/SortedSet";
import { ItemInitializer, AmmoInitializer, isAmmoInitializer } from "../../../../../../entities/library/items/ItemInitializers";
import { nonEmpty } from "../../../../../../utils/TypeUtils";
import { MultiSelect } from "../../../../../inputs/selects/multiselect/MultiSelect";

type Props = {
    items: SortedSet<ItemInitializer>;
    munitions: AmmoInitializer[];
    selectAmmo: (munitions: AmmoInitializer[]) => void;
}

export const AmmoPicker: React.FC<Props> = (props) => {
    const options = props.items.collection
            .filter<AmmoInitializer>(isAmmoInitializer)
            .filter(ammo => ammo.tags.find(tag => tag == 'Basic'))
            .map(ammo => ({
                name: ammo.name,
                value: ammo.id,
                disabled: props.munitions.length >= Character.MaxStartingMunitions
            }));

    const selectMunitions = (ids: string[]): void => {
        const munitions = ids.map(id => props.items.get(id))
            .filter<ItemInitializer>(nonEmpty)
            .filter<AmmoInitializer>(isAmmoInitializer);
        props.selectAmmo(munitions);
    }

    return (
        <div className='form-field'>
            <label>Choose up to two basic munitions:</label>
            <MultiSelect options={options} selections={props.munitions.map(ammo => ammo.id)}
                onChange={selectMunitions}>
            </MultiSelect>
        </div>
    );
}