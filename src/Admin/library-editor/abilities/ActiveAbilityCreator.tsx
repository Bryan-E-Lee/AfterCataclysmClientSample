import React from "react";
import { Complication, ComplicationOptions, EnemyActiveAbility, isEnemyAbility } from "../../../entities/library/enemies/EnemyAbilities";
import { getUniqueIdentifier } from "../../../utils/GUID";
import { ActiveAbility } from "../../../entities/abilities/ActiveAbility";
import { CollapsibleSection } from "../../../components/articles/CollapsibleSection";
import { ThemedCheckbox } from "../../../components/inputs/checkbox/ThemedCheckbox";
import { MultiSelect } from "../../../components/inputs/selects/multiselect/MultiSelect";
import { SingleSelect } from "../../../components/inputs/selects/singleselect/SingleSelect";
import { MarkdownContainer } from "../../../components/theming/MarkdownContainer";
import { HandTrigger } from "../../../entities/rolls/HandTrigger";
import { StringListEditor } from "../StringListEditor";
import { DamageSuiteEditor } from "../common/quantified-damage/DamageSuiteEditor";
import { HandTriggersEditor } from "../items/item-field-editors/HandTriggersEditor";
import { SkillNames } from "../../../entities/library/skills/SkillMap";
import { SelectableOption } from "../../../components/inputs/selects/SelectableOption";
import { PrimaryActionType } from "../../../entities/abilities/Ability";

export const DefaultActiveAbility: EnemyActiveAbility = {
    id: getUniqueIdentifier(),
    name: '',
    description: '',
    abilityType: 'ActiveAbility',
    type: 'Attack',
    juices: false,
    dejuices: false,
    skillsUsed: [],
    cost: 'None',
    customDamageTexts: [],
    tags: []
}

const typeOptions: SelectableOption<PrimaryActionType>[] = [
    { name: "Attack", value: "Attack" },
    { name: "Spell", value: "Spell" },
    { name: "Feature", value: "Feature" }
]

type Props = {
    action: ActiveAbility;
    onUpdate: (action: ActiveAbility) => unknown;
}

export const ActiveAbilityCreator = (props: Props) => {
    const { action, onUpdate } = props;
    const skillNameOptions = SkillNames.map(skillName => ({
        name: skillName,
        value: skillName
    }));
    return (
        <>
            <div>
                <label>Name</label>
                <input type='text' value={action.name ?? ''} onChange={(e) => onUpdate({ ...action, name: e.target.value })} aria-autocomplete="none" />
            </div>
            <div>
                <label>Description</label>
                <textarea value={action.description || ''}
                    onChange={(e) => onUpdate({ ...action, description: e.target.value })}></textarea>
                <CollapsibleSection header="Preview" expandedInitially>
                    <MarkdownContainer>{props.action.description}</MarkdownContainer>
                </CollapsibleSection>
            </div>
            <div>
                <label>Type</label>
                <SingleSelect options={typeOptions} selection={action.type}
                    onChange={type => onUpdate({ ...action, type })} />
            </div>
            <div>
                <label>Juices?</label>
                <ThemedCheckbox checked={action.juices} setChecked={(juices) => onUpdate({ ...action, juices })} />
            </div>
            <div>
                <label>Dejuices?</label>
                <ThemedCheckbox checked={action.dejuices} setChecked={(dejuices) => onUpdate({ ...action, dejuices })} />
            </div>
            <div>
                <label>Range</label>
                <input type='number' value={action.range || 0}
                    onChange={(e) => onUpdate({ ...action, range: parseInt(e.target.value) })} />
            </div>
            <div>
                <div>
                    <label>Hands</label>
                    <input type='number' value={action.hands || 0}
                        onChange={(e) => onUpdate({ ...action, hands: parseInt(e.target.value) })} />
                    <label>Null?</label>
                    <ThemedCheckbox checked={action.hands == null} setChecked={(checked) => onUpdate({ ...action, hands: checked ? undefined : action.hands })} />
                </div>
            </div>
            <div>
                <label>Skills Used</label>
                <MultiSelect options={skillNameOptions} selections={action.skillsUsed}
                    onChange={(selections) => onUpdate({ ...action, skillsUsed: selections })} />
            </div>
            <div>
                <label>Damage Suite</label>
                <DamageSuiteEditor damageSuite={action.damageSuite || []}
                    update={damageSuite => onUpdate({ ...action, damageSuite })} />
            </div>
            <div>
                <label>Hand Triggers</label>
                <HandTriggersEditor handTriggers={action.handTriggers || []}
                    update={(handTriggers: HandTrigger[]) => onUpdate({ ...action, handTriggers })} />
            </div>
            {isEnemyAbility(action) && (
                <div className="form-field">
                    <label>Complication Cost</label>
                    <SingleSelect selection={action.cost} options={ComplicationOptions}
                        onChange={(cost: Complication) => onUpdate({ ...action, cost } as ActiveAbility)}></SingleSelect>
                </div>
            )}
            <div className='form-field'>
                <label>Tags</label>
                <StringListEditor texts={action.tags} update={(tags) => onUpdate({ ...action, tags })} />
            </div>
        </>
    )
}