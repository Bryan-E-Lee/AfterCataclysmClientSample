import React from "react";
import { GetHandTriggerKey, HandOrderer } from "../../../../../../entities/rolls/HandTrigger";
import { CollapsibleSection } from "../../../../../articles/CollapsibleSection";
import { HandTriggerComponent } from "../../../character-sheet/common/hand-triggers/HandTriggerComponent";
import { ItemInitializer } from "../../../../../../entities/library/items/ItemInitializers";

type Props = {
    item: ItemInitializer;
}

export const ItemPreviewHandTriggers: React.FC<Props> = (props: Props) => {
    if (!props.item.handTriggers.any()) {
        return null;
    }
    props.item.handTriggers.sort(HandOrderer);
    return (
        <CollapsibleSection header={<header>Hand Triggers</header>} expandedInitially={true}>
            {props.item.handTriggers.map(ht => <HandTriggerComponent key={GetHandTriggerKey(ht)} handTrigger={ht} />)}
        </CollapsibleSection>
    );
}