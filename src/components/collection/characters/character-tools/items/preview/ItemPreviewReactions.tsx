import React from "react";
import { isCompleteItem } from "../../../../../../entities/library/items/Item";
import { ItemInitializer } from "../../../../../../entities/library/items/ItemInitializers";
import { CollapsibleRegion } from "../../../../../articles/CollapsibleRegion";
import { CharacterAbilityView } from "../../../character-sheet/main-section/CharacterAbilityView";
import { CharacterAbility } from "../../../../../../entities/abilities/Ability";

type Props = {
    item: ItemInitializer;
}

export const ItemPreviewReactions = (props: Props) => {
    const { item } = props;
    let reactions: CharacterAbility[];
    let hasNoOtherEffects: boolean;
    if (isCompleteItem(item)) {
        reactions = item.displayReactions;
        hasNoOtherEffects = !item.displayActions.any() && !item.displayPassives.any();
    }
    else {
        reactions = item.reactions.map(r => ({ ...r, source: item.name }));
        hasNoOtherEffects = !item.actions.any() && !item.passives.any();
    }

    if (!reactions.any()) {
        return null;
    }
    const expanded = hasNoOtherEffects || reactions.length == 1;
    return (
        <CollapsibleRegion header="Reactions" className="item-preview-ability-group" expanded={expanded}>
            {reactions.map(r => <CharacterAbilityView key={r.id} ability={r} expanded={expanded} />)}
        </CollapsibleRegion>
    )
}