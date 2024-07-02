import './character-sheet-skills.scss';
import React, { useState } from "react";
import { Character } from "../../../../../entities/characters/Character";
import { SkillWindow } from "./skill-window";
import { SkillComponent } from '../../../../characters/skills/SkillComponent';

type Props = {
    character: Character;
    viewOnMobile: boolean;
}

export const CharacterSheetSkills: React.FC<Props> = (props: Props) => {
    const { character, viewOnMobile } = props;
    const [currentSkillName, setSkillName] = useState<string | null>(null);
    const skill = character.skills.get(currentSkillName);
    return (
        <div className={`character-sheet-skills sheet-section ${viewOnMobile ? 'viewing' : 'unviewing'}`}>
            <h3 className="character-panel-header">Skills</h3>
            <div className="skills">
                {character.skills.collection.map(skill => (
                    <SkillComponent key={skill.id} character={character} skill={skill} onClick={() => setSkillName(skill.name)} />
                ))}
            </div>
            {skill && <SkillWindow character={character} skill={skill} close={() => setSkillName(null)} />}
        </div>
    );
}