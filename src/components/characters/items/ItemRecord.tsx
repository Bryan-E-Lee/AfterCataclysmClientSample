import React from "react";
import { ItemInitializer } from "../../../entities/library/items/ItemInitializers";
import { CollapsibleSection } from "../../articles/CollapsibleSection";
import { AddItemButton } from "../../library/items/AddItemButton";
import { ObjectIcons } from "../../icons";

type Props = {
    item: ItemInitializer;
    close?: () => void;
}

export const ItemRecord: React.FC<Props> = (props: Props) => {
    const { item, close } = props;
    const addButton = close != null
        ? <AddItemButton item={props.item} />
        : null;

    return (
        <>
            <div className="icon">{ObjectIcons.GetIcon(item.icon)}</div>
            <div className="name">{item.name}</div>
            <div className="cost">{item.cost} chips</div>
            <div className="tags">{item.tags.join(', ')}</div>
        </>
    );
    // return (
    //     // <CollapsibleSection header={header}>
    //     //     {props.item.description}
    //     //     {addButton}
    //     // </CollapsibleSection>
    // );
}