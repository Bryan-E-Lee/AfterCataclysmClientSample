import React from 'react';
import { useDispatch } from 'react-redux';
import { Character } from '../../../../../../entities/characters/Character';
import { Skill } from '../../../../../../entities/library/skills/Skill';
import { SheetActions } from '../../../../../../store/stores/characters/sheet/actions/Sheet.Actions';

type Props = {
    character: Character;
    skill: Skill;
}

export const SkillAdjustment: React.FC<Props> = (props: Props) => {
    const { character, skill } = props;
    const dispatch = useDispatch();    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const adjustment = parseInt(e.target.value);
        dispatch(SheetActions.adjustSkill(character, skill, adjustment));
    };

    return (
        <div className='value-modifier'>
            <label>Manual Adjustment:</label>
            <input className='value' type='number'
                value={skill.adjustment}
                min={Skill.MinValue - skill.level} max={Skill.MaxValue - skill.level}
                onChange={onChange} />
        </div>
    );
}