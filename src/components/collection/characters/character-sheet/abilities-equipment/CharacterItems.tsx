import './sheet-items.scss';
import React from "react";
import { Character } from "../../../../../entities/characters/Character";
import { Wearing } from "../main-section/equipment/Wearing";
import { InventoryComponent } from "../main-section/equipment/SheetContainers";
import { ThemedButton } from '../../../../inputs/buttons/ThemedButton';
import { HandsEquipped } from '../main-section/equipment/HandsEquipped';
import { useDispatch, useSelector } from 'react-redux';
import { SheetActions } from '../../../../../store/stores/characters/sheet/actions/Sheet.Actions';
import { ApplicationState } from '../../../../../store/stores/ApplicationState';

type Props = { character: Character }

export const CharacterItems: React.FC<Props> = (props: Props) => {
    const dispatch = useDispatch();
    const previewItemInstanceId = useSelector((state: ApplicationState) => state.sheet.previewItemInstanceId);
    const item = props.character.findItem(previewItemInstanceId ?? '');
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