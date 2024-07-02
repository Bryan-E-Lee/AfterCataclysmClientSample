import './move-item-window.scss';
import React from "react";
import { useDispatch } from "react-redux";
import { Character } from "../../../../../../entities/characters/Character";
import { Item } from "../../../../../../entities/library/items/Item";
import { isWeapon } from "../../../../../../entities/library/items/weapons/Weapon";
import { SheetActions } from "../../../../../../store/stores/characters/sheet/actions/Sheet.Actions";
import { HeldMover } from "./HeldMover";
import { WornMover } from "./WornMover";

type Props = {
    character: Character;
    item: Item;
}

export const MoveWindow: React.FC<Props> = (props: Props) => {
    const dispatch = useDispatch();
    const { character, item } = props;

    const itemCollectionResponse = character.getItemCollection(item);
    if (itemCollectionResponse == undefined) {
        return null;
    }

    const { collection, container } = itemCollectionResponse;
    return (
        <div className="move-item-window option-window">
            <div className="title">Move to:</div>
            {collection != 'Held'
                && isWeapon(item)
                && <HeldMover character={character} weapon={item} />}

            {collection != 'Worn'
                && item.wornOn.any()
                && <WornMover character={character} item={item} />}

            {collection != 'Loose'
                && (<button className="option" onClick={() => dispatch(SheetActions.moveToLoose(character, item))}>
                        Inventory
                    </button>)
            }
        </div>
    );
}