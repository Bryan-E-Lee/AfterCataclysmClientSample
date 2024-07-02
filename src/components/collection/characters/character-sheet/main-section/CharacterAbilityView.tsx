import "./character-ability.scss";
import React from "react";
import { CollapsibleSection } from "../../../../articles/CollapsibleSection";
import { DamageTypeSuiteComponent } from "../../character-tools/items/info/DamageTypeSuite";
import { SplitHandTriggersView, AggregateHandTriggersView } from "./HandTriggerViews";
import { CharacterAbility } from "../../../../../entities/abilities/Ability";
import { MarkdownContainer } from "../../../../theming/MarkdownContainer";
import { RequiresAttentionIcon } from "../../../../icons/CharacterIcons";
import { HandTypeName } from "../../../../../entities/rolls/Roll";
import { Character } from "../../../../../entities/characters/Character";

type Props = {
    character?: Character;
    ability: CharacterAbility;
    restrictToHand?: HandTypeName;
    expanded?: boolean;
    overrideExpanded?: boolean;
    onToggle?: (expanded: boolean) => unknown;
}

export const CharacterAbilityView = (props: Props) => {
    let { character, ability, restrictToHand, expanded, overrideExpanded, onToggle } = props;
    const expandedInitially = expanded ?? false;
    const header = (
        <>
            <div className="fill">
                {ability.icon}&nbsp;
                {ability.name}
                {ability.damageSuite?.any() && (<>&nbsp;-&nbsp;<DamageTypeSuiteComponent suite={ability.damageSuite} /></>)}
                &nbsp;
                {ability.source && <>[{ability.source}]</>}
            </div>
            {ability.requiresAttention && <RequiresAttentionIcon />}
        </>
    );
    let className: string;
    switch (ability.type) {
        case "Attack":
            className = "attack";
            break;
        case "Spell":
            className = "spell";
            break;
        default:
            className = "feature";
    }
    const isAttackOrSpell = ability.type == "Attack" || ability.type == "Spell"; //Attacks and spells aggregate abilities, features do not.
    const abilityHasProperties = ability.juices || ability.dejuices || ability.requiresAttention;
    return (
        <CollapsibleSection className={`character-ability ${className}`} header={header} overrideExpanded={overrideExpanded} onToggle={onToggle} expandedInitially={expandedInitially}>
            {abilityHasProperties && <div className="spell-properties">
                {ability.juices && <span>Juices</span>}
                {ability.dejuices && <span>Consumes Juice</span>}
                {ability.requiresAttention && <span><RequiresAttentionIcon /></span>}
            </div>}
            {ability.triggerCondition && (
                <div className="trigger-condition">
                    <label className="standout">Triggered When:</label>&nbsp;
                    {ability.triggerCondition}
                </div>
            )}
            {ability.source && ability.sourceDescription && (
                <div className="source-description">
                    <label className="standout">({ability.source})</label>&nbsp;
                    <MarkdownContainer>{ability.sourceDescription}</MarkdownContainer>
                </div>
            )}
            <div><label className="standout">({ability.name})</label>&nbsp;<MarkdownContainer>{ability.description}</MarkdownContainer></div>
            {ability.damageSuite?.any() && <DamageTypeSuiteComponent character={character} sourceId={ability.sourceId} customDamageTexts={ability.customDamageTexts} suite={ability.damageSuite} label="Damage: " />}
            {ability.range && <div><label className="standout">Range:</label>&nbsp;<span>{ability.range}</span></div>}
            {ability.handTriggers && isAttackOrSpell && <AggregateHandTriggersView handTriggers={ability.handTriggers} restrictToHand={restrictToHand} />}
            {ability.handTriggers && !isAttackOrSpell && <SplitHandTriggersView handTriggers={ability.handTriggers} restrictToHand={restrictToHand} />}
        </CollapsibleSection>
    )
}