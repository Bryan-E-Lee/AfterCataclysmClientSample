import React from 'react';
import { useDispatch } from 'react-redux';
import { Character } from '../../../../../../entities/characters/Character';
import { Skill } from '../../../../../../entities/library/skills/Skill';
import { SheetActions } from '../../../../../../store/stores/characters/sheet/actions/Sheet.Actions';

type Props = {
    character: Character;
    skill: Skill;
}

export const SkillOverride: React.FC<Props> = (props: Props) => {
    const { character, skill } = props;
    const dispatch = useDispatch();
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const override = parseInt(e.target.value)
        dispatch(SheetActions.overrideSkill(character, skill, override));
    }
    return (
        <div className='value-modifier'>
            <label>Manual Override:</label>
            <input className='value' type='number'
                value={skill.override ?? 0}
                min={0} max={15}
                onChange={onChange} />
        </div>
    );
}