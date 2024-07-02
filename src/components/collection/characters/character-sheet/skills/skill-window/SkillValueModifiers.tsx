import React from 'react';
import { Character } from '../../../../../../entities/characters/Character';
import { Skill } from '../../../../../../entities/library/skills/Skill';

type Props = {
    character: Character;
    skill: Skill;
}

export const SkillValueModifiers: React.FC<Props> = (props: Props) => {
    const valueModifiers = props.character.getSkillModifierValues(props.skill);
    return (
        <>
            {valueModifiers.map(vm => (
                <div key={vm.source} className='value-modifier'>
                    <label>{vm.source}:</label>
                    <div className='value'>{vm.value}</div>
                </div>
            ))}
        </>
    );
}