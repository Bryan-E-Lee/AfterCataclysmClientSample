import React from "react";
import { PassiveAbility } from "../../../entities/abilities/PassiveAbility";
import { getUniqueIdentifier } from "../../../utils/GUID";
import { CollapsibleSection } from "../../../components/articles/CollapsibleSection";
import { MarkdownContainer } from "../../../components/theming/MarkdownContainer";
import { StringListEditor } from "../StringListEditor";
import { EnemyPassiveAbility } from "../../../entities/library/enemies/EnemyAbilities";

export const DefaultPassiveAbility: EnemyPassiveAbility = {
    id: getUniqueIdentifier(),
    name: '',
    description: '',
    type: 'Feature',
    abilityType: 'PassiveAbility',
    cost: 'None',
    tags: []
}

type Props = {
    passive: PassiveAbility;
    onUpdate: (passive: PassiveAbility) => unknown;
}

export const PassiveAbilityCreator = (props: Props) => {
    const { passive, onUpdate } = props;
    return (
        <>
            <div className="form-field">
                <label>Name</label>
                <input type='text'
                    value={passive.name}
                    onChange={(e) => onUpdate({ ...passive, name: e.target.value })} />
            </div>
            <div className="form-field">
                <label>Description</label>
                <textarea value={passive.description} onChange={(e) => onUpdate({ ...passive, description: e.target.value })} />
                <CollapsibleSection header="Preview" expandedInitially>
                    <MarkdownContainer>{passive.description}</MarkdownContainer>
                </CollapsibleSection>
            </div>
            <div className='form-field'>
                <label>Tags</label>
                <StringListEditor texts={passive.tags} update={(tags) => onUpdate({ ...passive, tags })} />
            </div>
        </>
    )
}