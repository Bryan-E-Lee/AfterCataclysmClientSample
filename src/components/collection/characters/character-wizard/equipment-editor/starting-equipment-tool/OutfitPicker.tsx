import React from "react";
import { SortedSet } from "../../../../../../entities/data-structures/SortedSet";
import { ItemInitializer } from "../../../../../../entities/library/items/ItemInitializers";
import { SingleSelect } from "../../../../../inputs/selects/singleselect/SingleSelect";

type Props = {
    items: SortedSet<ItemInitializer>;
    outfit: ItemInitializer | null;
    selectOutfit: (outfit: ItemInitializer) => void;
}

export const OutfitPicker: React.FC<Props> = (props: Props) => {
    const outfits = props.items.collection
        .filter(item => item.tags.find(tag => tag == 'Outfit'))
        .filter(outfit => outfit.cost <= 10);
    const options = outfits.map(outfit => ({
        name: outfit.name,
        value: outfit.id
    }));
    const trySelectOutfit = (id: string) => {
        const outfit = props.items.get(id);
        if (outfit != null) {
            props.selectOutfit(outfit);
        }
    }
    return (
        <div className='form-field'>
            <label>An outfit worth 10 or fewer chips:</label>
            <SingleSelect options={options} selection={props.outfit?.id}
                onChange={trySelectOutfit} />
        </div>
    );
}