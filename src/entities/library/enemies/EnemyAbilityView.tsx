import React from "react";
import { EnemyAbility } from "./EnemyAbilities"
import { DamageTypeSuiteComponent } from "../../../components/collection/characters/character-tools/items/info/DamageTypeSuite";
import { CollapsibleSection } from "../../../components/articles/CollapsibleSection";
import { MarkdownContainer } from "../../../components/theming/MarkdownContainer";

type Props = {
    ability: EnemyAbility;
    expanded?: boolean;
    overrideExpanded?: boolean;
    onToggle?: (expanded: boolean) => unknown;
}

export const EnemyAbilityView = (props: Props) => {
    const { ability, expanded, overrideExpanded, onToggle } = props;
    const expandedInitially = expanded ?? false;
    return (
        <CollapsibleSection header={<EnemyAbilityHeader ability={ability} />} overrideExpanded={overrideExpanded} onToggle={onToggle} expandedInitially={expandedInitially}>
            {ability.type == 'Reaction' && (
                <div className="trigger-condition">
                    <label className="standout">Triggered When:</label>&nbsp;
                    {ability.triggerCondition}
                </div>
            )}
            <MarkdownContainer>{ability.description}</MarkdownContainer>
            {ability.damageSuite?.any() && <DamageTypeSuiteComponent suite={ability.damageSuite} label="Damage: " />}
            {ability.range && <div><label className="standout">Range:</label>&nbsp;<span>{ability.range}</span></div>}
        </CollapsibleSection>
    )
}

type HeaderProps = { ability: EnemyAbility }

const EnemyAbilityHeader = (props: HeaderProps) => {
    const { ability } = props;
    return (
        <div className="fill">
            {ability.name}&nbsp;{ability.cost != 'None' && <>({ability.cost} Complication)</>}
            {ability.damageSuite?.any() && (<>&nbsp;-&nbsp;<DamageTypeSuiteComponent suite={ability.damageSuite} /></>)}
        </div>
    );
}