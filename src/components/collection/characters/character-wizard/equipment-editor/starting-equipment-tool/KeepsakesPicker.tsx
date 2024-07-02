import React from "react";
import { useSelector } from "react-redux";
import { SortedSet } from "../../../../../../entities/data-structures/SortedSet";
import { ItemInitializer } from "../../../../../../entities/library/items/ItemInitializers";
import { ApplicationState } from "../../../../../../store/stores/ApplicationState";
import { SingleSelect } from "../../../../../inputs/selects/singleselect/SingleSelect";

type Props = {
    items: SortedSet<ItemInitializer>;
    selectedKeepsake: ItemInitializer | null;
    selectKeepsake: (keepsake: ItemInitializer | null) => void;
};

export const KeepsakesPicker = (props: Props) => {
    const keepsakeSet = useSelector((app: ApplicationState) => new SortedSet(app.library.items.filter(i => i.tags.find(t => t ==  'Personal'))));
    const keepsakeOptions = keepsakeSet.collection.map(keepsake => ({
            name: keepsake.name,
            value: keepsake.id
        }));

    return (
        <div className='form-field'>
            <label>Choose up to one keepsake:</label>
            <SingleSelect allowNull options={keepsakeOptions} selection={props.selectedKeepsake?.id}
                onChange={(option) => props.selectKeepsake(keepsakeSet.get(option) ?? null)} />
        </div>
    );
}
