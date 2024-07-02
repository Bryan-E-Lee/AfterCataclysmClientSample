import './item-preview.scss';
import React from "react"
import { Character } from "../../../../../../entities/characters/Character"
import { ItemPreviewActions } from "./ItemPreviewActions"
import { ItemPreviewBasicInfo } from "./ItemPreviewBasicInfo"
import { ItemPreviewHandTriggers } from "./ItemPreviewHandTriggers"
import { ItemPreviewMetrics } from "./ItemPreviewMetrics"
import { ItemPreviewPassives } from "./ItemPreviewPassives"
import { ItemPreviewReactions } from "./ItemPreviewReactions"
import { ItemPreviewSlots } from "./ItemPreviewSlots"
import { ItemPreviewTags } from "./ItemPreviewTags"
import { ItemInitializer } from '../../../../../../entities/library/items/ItemInitializers';

type Props = {
    character?: Character;
    item: ItemInitializer;
    editable?: boolean;
}

export const ItemPreview = (props: Props) => {
    const { character, item, editable } = props;
    return (
        <div className="item-preview">
            <ItemPreviewMetrics item={item} />
            <ItemPreviewBasicInfo item={item} />
            <ItemPreviewSlots character={character} item={item} editable={editable} />
            <ItemPreviewTags item={item} />
            <ItemPreviewHandTriggers item={item} />
            <ItemPreviewActions character={character} item={item} />
            <ItemPreviewReactions item={item} />
            <ItemPreviewPassives item={item} />
        </div>
    );
}