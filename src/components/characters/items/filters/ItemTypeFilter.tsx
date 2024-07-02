import React from "react"
import { ApparelIcon, AttacksIcon, DefaultIcon, HeavyWeaponIcon, ModIcon, SpellsIcon } from "../../../icons";
import { ItemCategoryValue } from "../../../../entities/library/items/ItemInitializers";

type Props = {
    types: ItemCategoryValue[];
    onChange: (type: ItemCategoryValue[]) => unknown;
}

export const ItemTypeFilter = (props: Props) => {
    const { types, onChange } = props;

    const isActiveClass = (type: ItemCategoryValue) => {
        return types.contains(type)
            ? 'active'
            : 'inactive';
    }

    const createTypeFilterEvent = (type: ItemCategoryValue) => {
        return () => {
            let updatedTypes: ItemCategoryValue[];
            if (types.contains(type)) {
                updatedTypes = types.filter(t => t != type);
            }
            else {
                updatedTypes = [...types, type];
            }
            onChange(updatedTypes);
        }
    }
    return (
        <div className="type-filters">
            <button className={`type-filter-button ${isActiveClass("Item")}`} onClick={createTypeFilterEvent("Item")}>
                <DefaultIcon />
                <label>Items</label>
            </button>
            <button className={`type-filter-button ${isActiveClass("Weapon")}`} onClick={createTypeFilterEvent("Weapon")}>
                <HeavyWeaponIcon />
                <label>Weapons &<br />Focuses</label>
            </button>
            <button className={`type-filter-button ${isActiveClass("Apparel")}`} onClick={createTypeFilterEvent("Apparel")}>
                <ApparelIcon />
                <label>Apparel</label>
            </button>
            <button className={`type-filter-button ${isActiveClass("Mod")}`} onClick={createTypeFilterEvent("Mod")}>
                <ModIcon />
                <label>Mods</label>
            </button>
            <button className={`type-filter-button ${isActiveClass("Ammo")}`} onClick={createTypeFilterEvent("Ammo")}>
                <AttacksIcon />
                <label>Munitions</label>
            </button>
            <button className={`type-filter-button ${isActiveClass("Spell")}`} onClick={createTypeFilterEvent("Spell")}>
                <SpellsIcon />
                <label>Spells</label>
            </button>
        </div>
    )
}