import React from "react"
import { useDispatch } from "react-redux";
import { Character } from "../../../entities/characters/Character";
import { Skill } from "../../../entities/library/skills/Skill";
import { SheetActions } from "../../../store/stores/characters/sheet/actions/Sheet.Actions";
import { DecreaseIcon, IncreaseIcon } from "../../icons";

type Props = {
    character: Character;
    skill: Skill;
    onClick?: () => void;
}

export const SkillComponent: React.FC<Props> = (props: Props) => {
    const { character, skill, onClick } = props;
    const dispatch = useDispatch();
    const decreaseDisabled = decreaseSkillIsDisabled(skill);
    const increaseDisabled = increaseSkillIsDisabled(character, skill);

    const decrease = () => {
        dispatch(SheetActions.updateSkill(character, skill, -1));
    }
    
    const increase = () => {
        dispatch(SheetActions.updateSkill(character, skill, 1));
    }

    const overrideClick = () => {
        if (onClick != null) {
            onClick();
        }
    }
    return (
        <div className="skill">
            <label>{skill.name}</label>
            <div className="midsection">
                <button className="interactable-button decrease" disabled={decreaseDisabled}
                    onClick={decrease}>
                    <DecreaseIcon />
                </button>

                <div className="numeric-value" onClick={overrideClick}>{skill.adjustedLevel}</div>

                <button className="interactable-button increase"
                    disabled={increaseDisabled}
                    onClick={increase}>
                    <IncreaseIcon />
                </button>
            </div>
            <div className="undersection">
                <div className="empowerment">
                    <label>Emp. Bonus:&nbsp;</label>
                    <span>+{skill.empowermentBonus}</span>
                </div>
                {skill.roller.diceBoons && <div className="rolls">{skill.roller.diceBoons}</div>}
            </div>
        </div>
    );
}

const increaseSkillIsDisabled = (character: Character, skill: Skill): boolean => {
    const skillMaxed = skill.adjustedLevel >= Skill.MaxValue;
    const atThreshold = skill.adjustedLevel - character.level >= Skill.MaxSkillDifference;
    const outOfPoints = character.remainingSkillPoints <= 0;

    return skillMaxed
        || atThreshold
        || outOfPoints;
}

const decreaseSkillIsDisabled = (skill: Skill): boolean => {
    return skill.adjustedLevel <= Skill.MinValue;
}