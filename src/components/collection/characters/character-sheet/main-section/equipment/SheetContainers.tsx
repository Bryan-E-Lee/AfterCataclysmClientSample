import React from "react";
import { Character } from "../../../../../../entities/characters/Character";
import { SheetItem } from "../../abilities-equipment/sheet-item/SheetItem";
import { ColumnNames } from "../../../character-tools/items/info/ColumnNames";

type Props = {
    character: Character;
}

export const InventoryComponent: React.FC<Props> = (props: Props) => {
    const { character } = props;
    const { loose } = character;
    return (
        <div className='inventory equipment-container content-divider'>
            <h3 className="bottom-margin">Inventory</h3>
            {!loose.any && <div className='no-items equipment-container content-divider'>No Items in Inventory</div>}
            {loose.any && <ColumnNames />}
            {loose.collection.map(item => (
                <SheetItem key={item.instanceId}
                    item={item}
                    character={props.character} />
            ))}
        </div>
    );
}