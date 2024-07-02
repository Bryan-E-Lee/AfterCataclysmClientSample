import React from "react";
import { Character } from "../../../../../../entities/characters/Character";
import { CollapsibleSection } from "../../../../../articles/CollapsibleSection";
import { CharacterItems } from "../../../character-sheet/abilities-equipment/CharacterItems";

type Props = { character: Character }

export const CurrentInventoryTool: React.FC<Props> = (props: Props) => {
    return (
        <div className='current-inventory-tool'>
            <CollapsibleSection header='Current Inventory' expandedInitially={props.character.inventory.length > 0}>
                Manage Inventory
                <CharacterItems character={props.character} />
            </CollapsibleSection>
        </div>
    );
}