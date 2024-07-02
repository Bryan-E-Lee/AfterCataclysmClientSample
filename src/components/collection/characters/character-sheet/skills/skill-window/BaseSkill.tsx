import React from 'react';
import { Skill } from '../../../../../../entities/library/skills/Skill';

type Props = { skill: Skill }

export const BaseSkill: React.FC<Props> = (props: Props) => {
    return (
        <div className='value-modifier'>
            <label>Base:</label>
            <div className='value'>{props.skill.level}</div>
        </div>
    );
}