import React from "react"
import { SortedSet } from "../../../../../../entities/data-structures/SortedSet";
import { ItemInitializer } from "../../../../../../entities/library/items/ItemInitializers";
import { MultiSelect } from "../../../../../inputs/selects/multiselect/MultiSelect";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../../../../../store/stores/ApplicationState";
import { nonEmpty } from "../../../../../../utils/TypeUtils";

type Props = {
    selections: ItemInitializer[];
    selectBundles: (bundles: ItemInitializer[]) => void;
}

export const BundlePicker: React.FC<Props> = (props: Props) => {
    const { selections, selectBundles } = props;
    const items = useSelector((app: ApplicationState) => new SortedSet(app.library.items))
    const bundles = items.collection.filter(p => p.tags.find(tag => tag == 'Bundle'));
    const options = bundles.map(bundle => ({
        name: bundle.name,
        value: bundle.id,
        bundle,
        disabled: selections.length >= 2
    }));
    const trySelectBundles = (ids: string[]) => {
        const bundles = ids.map(id => items.get(id)).filter(nonEmpty)
        selectBundles(bundles);
    };
    return (
        <div className='form-field'>
            <label>Choose up to two bundles:</label>
            <MultiSelect options={options} selections={selections.map(s => s.id)} onChange={trySelectBundles} />
        </div>
    );
}