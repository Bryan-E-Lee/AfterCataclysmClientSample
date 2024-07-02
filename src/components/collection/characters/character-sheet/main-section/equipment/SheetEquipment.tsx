import "./sheet-equipment.scss";
import React from "react";
import { useDispatch } from "react-redux";
import { Character } from "../../../../../../entities/characters/Character";
import { SheetActions } from "../../../../../../store/stores/characters/sheet/actions/Sheet.Actions";
import { ThemedButton } from "../../../../../inputs/buttons/ThemedButton";
import { HandsEquipped } from "./HandsEquipped";
import { InventoryComponent } from "./SheetContainers";
import { Wearing } from "./Wearing";

type Props = { character: Character }

export const SheetEquipment: React.FC<Props> = (props: Props) => {
    const dispatch = useDispatch();
    return (
        <>
            <ThemedButton onClick={() => dispatch(SheetActions.showItemAdder())}>
                Add Item
            </ThemedButton>
            <div className='items'>
                <HandsEquipped character={props.character} />
                <Wearing character={props.character} />
                <InventoryComponent character={props.character} />
            </div>
        </>
    );
}