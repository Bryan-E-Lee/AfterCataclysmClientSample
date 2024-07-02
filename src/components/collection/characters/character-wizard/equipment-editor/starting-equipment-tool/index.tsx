import React, { useState } from "react";
import { CollapsibleSection } from "../../../../../articles/CollapsibleSection";
import { OutfitPicker } from "./OutfitPicker";
import { ContainerPicker } from './ContainerPicker';
import { StaticItemsIndicator } from "./StaticItemsIndicator";
import { WeaponsPicker } from "./WeaponsPicker";
import { BundlePicker } from "./BundlePicker";
import { AmmoPicker } from "./AmmoPicker";
import { KeepsakesPicker } from "./KeepsakesPicker";
import { GoldPicker } from "./GoldPicker";
import { Character } from "../../../../../../entities/characters/Character";
import { SortedSet } from "../../../../../../entities/data-structures/SortedSet";
import { AmmoInitializer, ContainerInitializer, ItemInitializer, OwnedItemInitializer, WeaponInitializer } from "../../../../../../entities/library/items/ItemInitializers";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../../../../store/stores/ApplicationState";
import { ThemedButton } from "../../../../../inputs/buttons/ThemedButton";
import { SheetActions } from "../../../../../../store/stores/characters/sheet/actions/Sheet.Actions";
import { nonEmpty } from "../../../../../../utils/TypeUtils";
import { useNavigate } from "react-router";

type Props = { character: Character }

type State = {
    selectedOutfit: ItemInitializer | null;
    selectedContainer: ContainerInitializer | null;
    selectedBundles: ItemInitializer[];
    selectedTwoHander: WeaponInitializer | null;
    selectedOneHanders: WeaponInitializer[];
    selectedMunitions: AmmoInitializer[];
    selectedKeepsake: ItemInitializer | null;
    selectedGoldItems: ItemInitializer[];
}

const defaultState: State = {
    selectedOutfit: null,
    selectedContainer: null,
    selectedBundles: [],
    selectedTwoHander: null,
    selectedOneHanders: [],
    selectedMunitions: [],
    selectedKeepsake: null,
    selectedGoldItems: [],
}

export const StartingEquipmentTool: React.FC<Props> = (props: Props) => {
    const itemCollection = useSelector((state: ApplicationState) => state.library.items);
    const items = new SortedSet(itemCollection);
    const navigate = useNavigate();

    const [state, setState] = useState<State>(defaultState);

    const dispatch = useDispatch();
    const addItemsToInventory = () => {
        const newItems = [
            state.selectedOutfit,
            state.selectedContainer,
            ...state.selectedBundles,
            state.selectedTwoHander,
            ...state.selectedOneHanders,
            ...state.selectedMunitions,
            state.selectedKeepsake,
            ...state.selectedGoldItems
        ].filter<ItemInitializer>(nonEmpty);
        dispatch(SheetActions.addItemRange(props.character, newItems, (id: string) => navigate(id)));
    }
    return (
        <div className='starting-equipment-tool'>
            <CollapsibleSection header='Starting Equipment' expandedInitially={props.character.inventory.length == 0}>
                Select starting equipment to add:

                <OutfitPicker items={items}
                    outfit={state.selectedOutfit}
                    selectOutfit={(selectedOutfit) => setState({ ...state, selectedOutfit })} />

                <BundlePicker selections={state.selectedBundles}
                    selectBundles={(selectedBundles) => setState({ ...state, selectedBundles })} />

                <WeaponsPicker items={items}
                    twoHander={state.selectedTwoHander}
                    oneHanders={state.selectedOneHanders}
                    selectTwoHander={(selectedTwoHander) => setState({ ...state, selectedTwoHander })}
                    selectOneHanders={(selectedOneHanders) => setState({ ...state, selectedOneHanders })}
                    clearWeapons={() => setState({ ...state, selectedTwoHander: null, selectedOneHanders: [] })} />

                <AmmoPicker items={items}
                    munitions={state.selectedMunitions}
                    selectAmmo={(selectedMunitions) => setState({ ...state, selectedMunitions})} />

                <KeepsakesPicker items={items} selectedKeepsake={state.selectedKeepsake}
                    selectKeepsake={(selectedKeepsake) => setState({ ...state, selectedKeepsake })} />

                <GoldPicker items={items}
                    selectedItems={state.selectedGoldItems}
                    selectGoldItems={(selectedGoldItems) => setState({ ...state, selectedGoldItems })} />
                
                <ThemedButton onClick={addItemsToInventory}>Add Items to Inventory</ThemedButton>
            </CollapsibleSection>
        </div>
    );
}