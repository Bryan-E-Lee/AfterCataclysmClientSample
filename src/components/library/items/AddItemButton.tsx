import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Character, CollectionsToReferences } from "../../../entities/characters/Character";
import { ItemInitializer } from "../../../entities/library/items/ItemInitializers";
import { ApplicationState } from "../../../store/stores/ApplicationState";
import { SheetActions } from "../../../store/stores/characters/sheet/actions/Sheet.Actions";
import { ThemedButton } from "../../inputs/buttons/ThemedButton";

type Props = {
    item: ItemInitializer;
};

export const AddItemButton: React.FC<Props> = (props: Props) => {
    const { item } = props;
    const { sheet, library } = useSelector((state: ApplicationState) => state);
    const character = new Character(sheet, CollectionsToReferences(library));
    const dispatch = useDispatch();
    const onClick = () => {
        dispatch(SheetActions.addItem(character, item, sheet.addToContainerId));
        dispatch(SheetActions.hideItemAdder());
    }
    return (
        <div>
            <ThemedButton onClick={onClick}>
                Add
            </ThemedButton>
        </div>
    );
}