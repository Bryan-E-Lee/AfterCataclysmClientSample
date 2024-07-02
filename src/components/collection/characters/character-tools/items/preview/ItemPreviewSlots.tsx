
import React from 'react';
import { Character } from '../../../../../../entities/characters/Character';
import { Item, isCompleteItem } from '../../../../../../entities/library/items/Item';
import { ModSlotPreview } from './mods/ModSlotPreview';
import { ItemInitializer } from '../../../../../../entities/library/items/ItemInitializers';

type Props = {
    character?: Character;
    item: ItemInitializer;
    editable?: boolean;
}

export const ItemPreviewSlots: React.FC<Props> = (props: Props) => {
    return (
        <>
            <div className="row sheet-slots">
                {GetSheetSlots(props)}
            </div>
        </>
    );
}
const GetSheetSlots = (props: Props): React.ReactNode[] => {
    const { character, item, editable } = props;
    const parentItem = isCompleteItem(item)
        ? item as Item
        : undefined;
    const mods = parentItem?.mods ?? [];
    const customSlots = parentItem?.customSlots ?? [];
    return [
        ...item.slots.map(slot => (
            <ModSlotPreview key={slot.id}
                character={character}
                item={parentItem}
                slot={slot}
                editable={editable} />
        )),
        ...customSlots.map(slot => (
            <ModSlotPreview key={slot.id}
                character={character}
                item={parentItem}
                slot={slot}
                editable={editable}
                custom />
        )),
        ...mods.mapMany(mod => GetSheetSlots({ ...props, item: mod }))
    ]
}