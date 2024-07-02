import React from "react";
import { DeclarableHands, DeclarableHandType, DeclarableHandTypeName } from "../../../../../entities/rolls/Roll";
import { CollapsibleRegion } from "../../../../articles/CollapsibleRegion";
import { HandTriggerExamplesByName } from "../../../../figures/Rolls";
import { CharacterAbility } from "../../../../../entities/abilities/Ability";
import { CharacterAbilityView } from "./CharacterAbilityView";
import { Character } from "../../../../../entities/characters/Character";

type Props = {
    character: Character;
    activeAbilities: CharacterAbility[]
}

export const ActiveAbilitiesByHandComponent = (props: Props) => {
    const { character, activeAbilities } = props;
    const declarableHandTypes = Object.values(DeclarableHands);
    declarableHandTypes.sort((a, b) => a.value > b.value
                                        ? 1
                                        : a.value < b.value
                                            ? -1
                                            : 0);
    return (
        <>
            {declarableHandTypes.map(dh => <ActiveAbilitiesForHand key={dh.name} character={character} hand={dh} activeAbilities={activeAbilities} />)}
        </>
    );
}

type ActiveAbilitiesForHandProps = {
    character: Character;
    hand: DeclarableHandType;
    activeAbilities: CharacterAbility[];
}

const ActiveAbilitiesForHand = (props: ActiveAbilitiesForHandProps) => {
    const { character, hand, activeAbilities } = props;
    const matchingAbilities = activeAbilities
        .filter(saa => saa.handTriggers?.any(ht => ht.handTypes.contains(hand.name)) ?? false)
        .unique(saa => saa.id);
    if (!matchingAbilities.any()) {
        return null;
    }
    const header = <>{hand.name} (ex. {HandTriggerExamplesByName[hand.name]})</>
    return (
        <CollapsibleRegion header={header}>
            {matchingAbilities.map(a => <CharacterAbilityView key={a.id} character={character} ability={a} restrictToHand={hand.name} />)}
        </CollapsibleRegion>
    );
}