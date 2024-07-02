import React from "react";
import { isCompleteItem } from "../../../../../../entities/library/items/Item";
import { ItemInitializer } from "../../../../../../entities/library/items/ItemInitializers";
import { CollapsibleRegion } from "../../../../../articles/CollapsibleRegion";
import { CharacterAbilityView } from "../../../character-sheet/main-section/CharacterAbilityView";
import { CharacterAbility } from "../../../../../../entities/abilities/Ability";

type Props = {
    item: ItemInitializer;
}

export const ItemPreviewPassives = (props: Props) => {
    const { item } = props;
    let passives: CharacterAbility[];
    let hasNoOtherEffects: boolean;
    if (isCompleteItem(item)) {
        passives = item.displayPassives;
        hasNoOtherEffects = !item.displayActions.any() && !item.displayReactions.any();
    }
    else {
        passives = item.passives.map(p => ({ ...p, source: item.name }));
        hasNoOtherEffects = !item.actions.any() && !item.reactions.any();
    }

    if (!passives.any()) {
        return null;
    }
    const expanded = hasNoOtherEffects || passives.length == 1;
    return (
        <CollapsibleRegion header="Passives" className="item-preview-ability-group" expanded={expanded}>
            {passives.map(p => <CharacterAbilityView key={p.id} ability={p} expanded={expanded} />)}
        </CollapsibleRegion>
    )
}