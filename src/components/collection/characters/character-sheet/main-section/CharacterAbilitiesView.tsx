import React, { useState } from "react";
import { CharacterAbility } from "../../../../../entities/abilities/Ability"
import { CharacterAbilityView } from "./CharacterAbilityView";
import { ThemedButton } from "../../../../inputs/buttons/ThemedButton";
import { Character } from "../../../../../entities/characters/Character";

type Props = {
    character: Character;
    abilities: CharacterAbility[];
}

export const CharacterAbilitiesView = (props: Props) => {
    const { character, abilities } = props;

    const [expandeds, setExpandeds] = useState<boolean[]>(abilities.map(_ => false));
    const createSetExpanded = (index: number) => {
        return (expanded: boolean) => {
            expandeds.splice(index, 1, expanded)
            setExpandeds([...expandeds]);
        }
    }
    const allExpanded = expandeds.every(e => e)
    const toggleAll = () => setExpandeds(abilities.map(_ => !allExpanded));
    return (
        <>
            <div>
                <ThemedButton onClick={toggleAll}>
                    {!allExpanded && "Expand All"}
                    {allExpanded && "Collapse All"}
                </ThemedButton>
            </div>
            {abilities.map((a, index) => (
                <CharacterAbilityView key={a.id} character={character} ability={a} overrideExpanded={expandeds[index]} onToggle={createSetExpanded(index)} />
            ))}
        </>
    )
}