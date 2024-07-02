import "./minion-preview.scss";
import React from "react";
import { Character } from "../../../../../../entities/characters/Character";
import { MinionInitializer } from "../../../../../../entities/library/minions/Minion"
import { CollapsibleRegion } from "../../../../../articles/CollapsibleRegion";
import { CharacterAbilityView } from "../CharacterAbilityView";

type Props = {
    character: Character;
    minion: MinionInitializer;
    expanded?: boolean;
}

export const MinionPreview = (props: Props) => {
    const { minion } = props;
    const { description, creatureTypes, baseHealth, healthScale,
        armor, resilience, featuresByLevel } = minion;

    const hasActionsByLevel = featuresByLevel.mapMany(fbl => fbl.activeAbilities).any();

    const hasReactionsByLevel = featuresByLevel.mapMany(fbl => fbl.reactiveAbilities).any();

    const hasPassivesByLevel = featuresByLevel.mapMany(fbl => fbl.passiveAbilities).any();

    const innateAbilities = featuresByLevel.filter(fbl => fbl.level <= 1);
    const leveledAbilities = featuresByLevel.filter(fbl => fbl.level > 1);
    return (
        <div className="entity-view">
            <div><label className="standout">Creature Types:</label>&nbsp;{creatureTypes.join(", ")}</div>
            <div><label className="standout">Description:</label>&nbsp;{description}</div>
            <div className="metrics">
                <label className="standout">Health:</label><span className="metric-value">{baseHealth}</span>
                <label className="standout">Health Scale:</label><span className="metric-value">{healthScale} per command</span>
                <label className="standout">Armor:</label><span className="metric-value">{armor}</span>
                <label className="standout">Resilience:</label><span className="metric-value">{resilience}</span>
            </div>
            <div className="abilities">
                {hasActionsByLevel && 
                    <>
                        <h3>Actions</h3>
                        {innateAbilities.mapMany(a => a.activeAbilities.map((aa, index) => <CharacterAbilityView key={aa.id} ability={aa} expanded={index == 0 && innateAbilities.length == 1} />))}
                        {leveledAbilities.map(abl => (
                            <CollapsibleRegion key={abl.level} header={`Level ${abl.level}`}>
                                {abl.activeAbilities.map(a => <CharacterAbilityView key={a.id} ability={a} />)}
                            </CollapsibleRegion>
                        ))}
                    </>
                }
                {hasReactionsByLevel && 
                    <>
                        <h3>Reactions</h3>
                        {innateAbilities.mapMany(a => a.reactiveAbilities.map((ra, index) => <CharacterAbilityView key={ra.id} ability={ra} expanded={index == 0 && innateAbilities.length == 1} />))}
                        {leveledAbilities.map(rbl => (
                            <CollapsibleRegion key={rbl.level} header={`Level ${rbl.level}`}>
                                {rbl.reactiveAbilities.map(a => <CharacterAbilityView key={a.id} ability={a} />)}
                            </CollapsibleRegion>
                        ))}
                    </>
                }
                {hasPassivesByLevel && 
                    <>
                        <h3>Passive Abilities</h3>
                        {innateAbilities.map(a => a.passiveAbilities.map((pa, index) => <CharacterAbilityView key={pa.id} ability={pa} expanded={index == 0 && innateAbilities.length == 1} />))}
                        {leveledAbilities.map(pbl => (
                            <CollapsibleRegion key={pbl.level} header={`Level ${pbl.level}`}>
                                {pbl.passiveAbilities.map(p => <CharacterAbilityView key={p.id} ability={p} />)}
                            </CollapsibleRegion>
                        ))}
                    </>
                }
            </div>
        </div>
    )
}