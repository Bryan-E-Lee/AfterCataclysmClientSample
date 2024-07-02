import './character-wizard.scss';
import React from "react";
import { EditorHeader } from "./EditorHeader";
import { EquipmentWizard } from "./equipment-editor";
import { PersonalityWizard } from "./personality-wizard";
import { SkillsWizard } from "./skill-level-editor/SkillsEditor";
import { Character } from '../../../../entities/characters/Character';
import { NameKinshipWizard } from './background-wizard';
import { BodyModWizard } from './BodyModWizard';
import { CompetenciesWizard } from './CompetenciesWizard';
import { Route, Routes } from 'react-router';

type Props = { character: Character }

export const CharacterWizard: React.FC<Props> = (props: Props) => {
    const { character } = props;
    return (
        <div className='character-wizard'>
            <EditorHeader />
            <Routes>
                <Route exact>
                    <NameKinshipWizard character={character} />
                </Route>
                <Route path={`Personality/*`}>
                    <PersonalityWizard character={character} />
                </Route>
                <Route path={`Skills/*`}>
                    <SkillsWizard character={character} />
                </Route>
                <Route path={`Competencies/*`}>
                    <CompetenciesWizard character={character} />
                </Route>
                <Route path={`BodyMod/*`}>
                    <BodyModWizard character={character} />
                </Route>
                <Route path={`Equipment/*`}>
                    <EquipmentWizard character={character} />
                </Route>
            </Routes>
        </div>
    );
}