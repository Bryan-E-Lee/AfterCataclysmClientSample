import React from "react";
import { CharacterAbilityView } from "./CharacterAbilityView";
import { CharacterAbility } from "../../../../../entities/abilities/Ability";
import { Character } from "../../../../../entities/characters/Character";

type Props = {
    character: Character;
    reactions: CharacterAbility[];
}

export const Reactions = (props: Props) => {
    const { character, reactions } = props;
    return (
        <>
            {reactions.unique(r => r.id).map(r => <CharacterAbilityView key={r.id} character={character} ability={r} />)}
        </>
    );
}