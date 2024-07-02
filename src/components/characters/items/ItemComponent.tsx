import React from "react";
import { ItemInitializer } from "../../../entities/library/items/ItemInitializers";

type Props = { item: ItemInitializer };

export const ItemComponent: React.FC<Props> = (props: Props) => {
    return (
        <div>{props.item.name}</div>
    );
}