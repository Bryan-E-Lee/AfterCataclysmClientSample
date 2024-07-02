import React from "react";
import { ReactiveAbility } from "../../../entities/abilities/ReactiveAbility";
import { Complication, ComplicationOptions, EnemyReactiveAbility, isEnemyAbility } from "../../../entities/library/enemies/EnemyAbilities";
import { getUniqueIdentifier } from "../../../utils/GUID";
import { CollapsibleSection } from "../../../components/articles/CollapsibleSection";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { ThemedCheckbox } from "../../../components/inputs/checkbox/ThemedCheckbox";
import { SingleSelect } from "../../../components/inputs/selects/singleselect/SingleSelect";
import { MarkdownContainer } from "../../../components/theming/MarkdownContainer";
import { QuantifiedDamage, GenerateQuantifiedDamageKey } from "../../../entities/categorization/QuantifiedDamage";
import { StringListEditor } from "../StringListEditor";
import { QuantifiedDamageEditor } from "../common/quantified-damage/QuantifiedDamageEditor";
import { SelectableOption } from "../../../components/inputs/selects/SelectableOption";
import { PrimaryActionType } from "../../../entities/abilities/Ability";
import { DamageSuiteEditor } from "../common/quantified-damage/DamageSuiteEditor";

export const DefaultReactiveAbility: EnemyReactiveAbility = {
    id: getUniqueIdentifier(),
    name: '',
    description: '',
    triggerCondition: '',
    type: 'Attack',
    juices: false,
    dejuices: false,
    abilityType: 'ReactiveAbility',
    cost: 'None',
    tags: []
}

const typeOptions: SelectableOption<PrimaryActionType>[] = [
    { name: "Attack", value: "Attack" },
    { name: "Spell", value: "Spell" },
    { name: "Feature", value: "Feature" }
]

type Props = {
    reaction: ReactiveAbility;
    onUpdate: (reaction: ReactiveAbility) => unknown;
}

export const ReactiveAbilityCreator = (props: Props) => {
    const { reaction, onUpdate } = props;
    return (
        <>
            <div>
                <label>Name</label>
                <input type='text' value={reaction.name} onChange={(e) => onUpdate({ ...reaction, name: e.target.value })} />
            </div>
            <div>
                <label>Description</label>
                <textarea value={reaction.description}
                    onChange={(e) => onUpdate({ ...reaction, description: e.target.value })}></textarea>
                <CollapsibleSection header="Preview" expandedInitially>
                    <MarkdownContainer>{props.reaction.description}</MarkdownContainer>
                </CollapsibleSection>
            </div>
            <div>
                <label>Type</label>
                <SingleSelect options={typeOptions} selection={reaction.type}
                    onChange={type => onUpdate({ ...reaction, type })} />
            </div>
            <div>
                <label>Trigger Condition</label>
                <textarea value={reaction.triggerCondition}
                    onChange={(e) => onUpdate({ ...reaction, triggerCondition: e.target.value })}></textarea>
            </div>
            <div>
                <label>Juices?</label>
                <ThemedCheckbox checked={reaction.juices} setChecked={(juices) => onUpdate({ ...reaction, juices })} />
            </div>
            <div>
                <label>Dejuices?</label>
                <ThemedCheckbox checked={reaction.dejuices} setChecked={(dejuices) => onUpdate({ ...reaction, dejuices })} />
            </div>
            <div>
                <label>Range</label>
                <input type='number' value={reaction.range ?? 0}
                    onChange={(e) => onUpdate({ ...reaction, range: parseInt(e.target.value) })} />
            </div>
            <div>
                <label>Damage Suite</label>
                <DamageSuiteEditor damageSuite={reaction.damageSuite || []}
                    update={damageSuite => onUpdate({ ...reaction, damageSuite })} />
            </div>
            {isEnemyAbility(reaction) && (
                <div className="form-field">
                    <label>Complication Cost</label>
                    <SingleSelect selection={reaction.cost} options={ComplicationOptions}
                        onChange={(cost: Complication) => onUpdate({ ...reaction, cost } as ReactiveAbility)}></SingleSelect>
                </div>
            )}
            <div className='form-field'>
                <label>Tags</label>
                <StringListEditor texts={reaction.tags} update={(tags) => onUpdate({ ...reaction, tags })} />
            </div>
        </>
    )
}