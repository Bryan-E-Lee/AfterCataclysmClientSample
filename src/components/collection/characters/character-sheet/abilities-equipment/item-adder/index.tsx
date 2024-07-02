import './item-adder.scss';
import React from "react";
import { BreakdownWindow } from "../../../../../theming/breakdown-window";
import { ItemsView } from '../../../../../characters/items/ItemsView';
import { Character } from '../../../../../../entities/characters/Character';

type Props = {
    character: Character;
    visible: boolean;
    close: () => void;
}

export const ItemAdder: React.FC<Props> = (props: Props) => {
    return (
        <BreakdownWindow className="item-adder" heading={<h1>Add Item to Inventory</h1>} visible={props.visible} close={props.close}>
            <ItemsView useRoute={false} close={props.close} />
        </BreakdownWindow>
    );
}