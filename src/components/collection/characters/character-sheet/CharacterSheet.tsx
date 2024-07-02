import './character-sheet.scss';
import React, { useState } from "react";
import { Character } from "../../../../entities/characters/Character";
import { CharacterSheetDemographics } from './CharacterSheetDemographics';
import { CharacterSheetMetrics } from './body/SheetBody';
import { CharacterSheetSkills } from './skills/CharacterSheetSkills';
import { CharacterSheetRhetorics } from './rhetorics/CharacterSheetRhetorics';
import { CharacterSheetPersonalities } from './personalities/CharacterSheetPersonalities';
import { SheetQuickAccess } from './quick-access';
import { SheetMainSection } from './main-section/SheetMainSection';
import { SheetConditions } from './SheetConditions';
import { SheetPerks } from './SheetPerks';
import { SheetCompetencies } from './competencies/SheetCompetencies';

type Props = { character: Character };

type SheetView = 'Stats'
    | 'Skills'
    | 'Personality'
    | 'Abilities & Equipment';

export const CharacterSheetComponent: React.FC<Props> = (props: Props) => {
    const { character } = props;
    const [currentPage, setCurrentPage] = useState<SheetView>('Stats');
    return (
        <>
            <SheetQuickAccess character={character} />
            <div className='character-sheet'>
                <CharacterSheetDemographics character={character} />
                <SheetPerks character={character} />
                <SheetConditions character={character} />
                <SheetCompetencies character={character} />
                <CharacterSheetMetrics character={character} viewOnMobile={currentPage == 'Stats'} />
                <CharacterSheetSkills character={character} viewOnMobile={currentPage == 'Skills'} />
                <CharacterSheetRhetorics character={character} viewOnMobile={currentPage == 'Personality'} />
                <CharacterSheetPersonalities character={character} viewOnMobile={currentPage == 'Personality'} />
                <SheetMainSection character={character} viewOnMobile={currentPage == "Abilities & Equipment"} />
            </div>
        </>
    );
}