import React from "react";
import { Character } from "../../../../../../entities/characters/Character";
import { SheetItem } from "../../abilities-equipment/sheet-item/SheetItem";
import { ColumnNames } from "../../../character-tools/items/info/ColumnNames";

type Props = {
    character: Character;
}

export const HandsEquipped: React.FC<Props> = (props: Props) => {
    return (
        <div className='hands equipment-container content-divider'>
            <h3 className="bottom-margin">Held</h3>
            <HandContents character={props.character} />
        </div>
    );
}

const HandContents: React.FC<Props> = (props: Props) => {
    const hands = props.character.held.collection;
    if(hands.length <= 0) {
        return <div className='no-items'>Nothing in Hand. Wield something to take action.</div>;
    }
    else {
        return (
            <>
                <ColumnNames />
                {hands.map(weapon => (
                    <SheetItem key={weapon.instanceId}
                        item={weapon}
                        character={props.character} />
                ))}
            </>
        );
    }
}