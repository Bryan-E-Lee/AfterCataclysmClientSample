import "./skill-window.scss";
import React from "react";
import { Character } from "../../../../../../entities/characters/Character";
import { BreakdownWindow } from "../../../../../theming/breakdown-window";
import { Skill } from "../../../../../../entities/library/skills/Skill";
import { BaseSkill } from "./BaseSkill";
import { SkillAdjustment } from "./SkillAdjustment";
import { SkillOverride } from "./SkillOverride";
import { SkillValueModifiers } from "./SkillValueModifiers";

type Props = {
    character: Character;
    skill: Skill;
    close: () => void;
};

export const SkillWindow: React.FC<Props> =  (props: Props) => {
    const { character, skill, close } = props;
    const baseSkill = character.skills.get(skill.name);
    if (baseSkill == null) {
        throw "Received skill with no base skill.";
    }
    return (
        <BreakdownWindow className="skill-window" close={close} heading={<h1>{skill.name}</h1>}>
            <div className="value-summary">
                <BaseSkill skill={baseSkill} />
                <SkillValueModifiers character={character} skill={skill} />
                <SkillAdjustment character={character} skill={skill} />
                <SkillOverride character={character} skill={skill} />
                <div className="value-modifier total">
                    <label>Total:</label>
                    <div className="value">{skill.level}</div>
                </div>
            </div>
        </BreakdownWindow>
    );
}