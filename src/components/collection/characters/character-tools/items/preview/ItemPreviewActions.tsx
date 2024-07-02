import React from "react";
import { isCompleteItem } from "../../../../../../entities/library/items/Item";
import { CollapsibleRegion } from "../../../../../articles/CollapsibleRegion";
import { CharacterAbilityView } from "../../../character-sheet/main-section/CharacterAbilityView";
import { ItemInitializer } from "../../../../../../entities/library/items/ItemInitializers";
import { CharacterAbility } from "../../../../../../entities/abilities/Ability";
import { Character } from "../../../../../../entities/characters/Character";

type Props = {
    character?: Character;
    item: ItemInitializer;
}

export const ItemPreviewActions = (props: Props) => {
    const { character, item } = props;
    let actions: CharacterAbility[];
    let hasNoOtherEffects: boolean;
    if (isCompleteItem(item)) {
        actions = item.displayActions;
        hasNoOtherEffects = !item.displayReactions.any() && !item.displayPassives.any();
    }
    else {
        actions = item.actions;
        hasNoOtherEffects = !item.reactions.any() && !item.passives.any();
    }

    if (!actions.any()) {
        return null;
    }
    const expanded = hasNoOtherEffects || actions.length == 1;
    return (
        <CollapsibleRegion header="Actions" className="item-preview-ability-group" expanded={expanded}>
            {actions.map(a => <CharacterAbilityView key={a.id} character={character} ability={a} expanded={expanded} />)}
        </CollapsibleRegion>
    )
}