import React from "react";
import { Character } from "../../../../../entities/characters/Character";
import { Skill } from "../../../../../entities/library/skills/Skill";
import { SkillComponent } from "../../../../characters/skills/SkillComponent";

type EditorProps = {
    character: Character;
    skill: Skill;
    remainingPoints: number;
};

export const SingleSkillPickerEditor: React.FC<EditorProps> = (props: EditorProps) => (
    <li key={props.skill.name}>
        <SkillComponent character={props.character} skill={props.skill} />
    </li>
);