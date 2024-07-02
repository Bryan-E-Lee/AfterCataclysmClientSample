import React from "react";
import { Enemy } from "./Enemy";
import { EnemyAbilityView } from "./EnemyAbilityView";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../../store/stores/ApplicationState";
import { CreatureTypeCollection } from "../../characters/CreatureType";

type Props = { enemy: Enemy }

export const StatBlock = (props: Props) => {
    const { enemy } = props;
    const { name, description,
        level, health, healthScale,
        armor, resilience, empowerment,
        movement, activeAbilities, commonActiveAbilities,
        reactiveAbilities, commonReactiveAbilities, passiveAbilities,
        commonPassiveAbilities, tags } = enemy;
    
    let { enemyActiveAbilities, enemyReactiveAbilities, enemyPassiveAbilities } = useSelector((app: ApplicationState) => app.library);
    enemyActiveAbilities = enemyActiveAbilities.filter(eaa => commonActiveAbilities.any(caa => caa == eaa.id))
    enemyReactiveAbilities = enemyReactiveAbilities.filter(eaa => commonReactiveAbilities.any(caa => caa == eaa.id))
    enemyPassiveAbilities = enemyPassiveAbilities.filter(eaa => commonPassiveAbilities.any(caa => caa == eaa.id))
    const actions = [...activeAbilities, ...enemyActiveAbilities];
    const reactions = [...reactiveAbilities, ...enemyReactiveAbilities];
    const passives = [...passiveAbilities, ...enemyPassiveAbilities];
    const creatureTypes = tags.intersection(CreatureTypeCollection);
    return (
        <div className="entity-view entity-panel">
            <header className="entity-panel-header">{name}</header>
            <div><label className="standout">Level:</label>&nbsp;{level}</div>
            <div><label className="standout">Creature Types:</label>&nbsp;{creatureTypes.join(", ")}</div>
            <div><label className="standout">Description:</label>&nbsp;{description}</div>
            <div className="metrics">
                <label className="standout">Health:</label><span className="metric-value">{health}</span>
                <label className="standout">Armor:</label><span className="metric-value">{armor}</span>
                <label className="standout">Health Scale:</label><span className="metric-value">{healthScale} / level</span>
                <label className="standout">Resilience:</label><span className="metric-value">{resilience}</span>
                <label className="standout">Movement:</label><span className="metric-value">{movement}</span>
                <label className="standout">Empower:</label><span className="metric-value">{empowerment}</span>
            </div>
            {actions.any() && <>
                <header className="entity-view-header">Actions</header>
                {actions.map(a => <EnemyAbilityView key={a.name} ability={a} />)}
            </>}

            {reactions.any() && <>
                <header className="entity-view-header">Reactions</header>
                {reactions.map(a => <EnemyAbilityView key={a.name} ability={a} />)}
            </>}

            {passives.any() && <>
                <header className="entity-view-header">Passives</header>
                {passives.map(a => <EnemyAbilityView key={a.name} ability={a} />)}
            </>}
        </div>
    );
}