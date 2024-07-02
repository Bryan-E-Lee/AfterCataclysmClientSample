import React from "react"
import { AbilityContainer } from "../../../entities/abilities/AbilityContainer"
import { CollapsibleRegion } from "../../articles/CollapsibleRegion"
import { CharacterAbilityView } from "../../collection/characters/character-sheet/main-section/CharacterAbilityView"

type Props = {
    entity: AbilityContainer
}

export const AbilityCollection = (props: Props) => {
    const { entity } = props;
    const { activeAbilities, reactiveAbilities, passiveAbilities } = entity;
    const hasActiveAbilities = (activeAbilities?.length ?? 0) > 0;
    const activeAbilitiesExpanded = activeAbilities!.length == 1;

    const hasReactiveAbilities = (reactiveAbilities?.length ?? 0) > 0;
    const reactiveAbilitiesExpanded = reactiveAbilities!.length == 1;

    const hasPassiveAbilities = (passiveAbilities?.length ?? 0) > 0;
    const passiveAbilitiesExpanded = passiveAbilities!.length == 1;
    return (
        <>
            {hasActiveAbilities && 
                <CollapsibleRegion header={"Actions"} expanded={activeAbilitiesExpanded}>
                    {activeAbilities!.map(a => <CharacterAbilityView key={a.id} ability={a} expanded={activeAbilitiesExpanded} />)}
                </CollapsibleRegion>
            }
            {hasReactiveAbilities &&
                <CollapsibleRegion header={"Reactions"} expanded={reactiveAbilitiesExpanded}>
                    {reactiveAbilities!.map(r => <CharacterAbilityView key={r.id} ability={r} expanded={reactiveAbilitiesExpanded} />)}
                </CollapsibleRegion>
            }
            {hasPassiveAbilities &&
                <CollapsibleRegion header={"Passives"} expanded={passiveAbilitiesExpanded}>
                    {passiveAbilities!.map(p => <CharacterAbilityView key={p.id} ability={p} expanded={passiveAbilitiesExpanded} />)}
                </CollapsibleRegion>
            }
        </>
    )
}