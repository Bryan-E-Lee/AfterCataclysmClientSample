import React from "react";
import { Character } from "../../../../../../entities/characters/Character";
import { SheetItem } from "../../abilities-equipment/sheet-item/SheetItem";
import { ColumnNames } from "../../../character-tools/items/info/ColumnNames";

type Props = {
    character: Character;
}

export const Wearing: React.FC<Props> = (props: Props) => (
    <div className='equipment equipment-container content-divider'>
        <h3 className="bottom-margin">Wearing</h3>
        <WearingContents character={props.character} />
    </div>
)

const WearingContents: React.FC<Props> = (props: Props) => {
    const worn = props.character.worn.collection;
    if(worn.length <= 0) {
        return <div className='no-items'>Nothing Worn</div>;
    }
    else {
        return (
            <>
                <ColumnNames  />
                <div className='equipment-list'>
                    {worn.map(wornItem => (
                        <SheetItem key={wornItem.instanceId}
                            item={wornItem}
                            character={props.character} />
                    ))}
                </div>
            </>
        );
    }
}