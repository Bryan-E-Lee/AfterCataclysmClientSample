import React, { useState } from "react"
import { Character } from "../../../../../entities/characters/Character"
import { ExpertIcon } from "../../../../icons";
import { BreakdownWindow } from "../../../../theming/breakdown-window";
import { Competency } from "../../../../../entities/characters/Competencies";
import { SortedSet } from "../../../../../entities/data-structures/SortedSet";
import { SheetCompetencyEditor } from "./SheetCompetencyEditor";

type Props = {
    character: Character;
}

export const SheetCompetencies = (props: Props) => {
    const { character } = props;
    const [editing, setEditing] = useState(false);
    
    const allCharacterCompetencies = new SortedSet<Competency>([
        ...character.competencies,
        ...character.customCompetencies
    ]).collection;
    return (
        <>
            <div className="sheet-competencies">
                <button className="sheet-toggles interactable-button" onClick={() => setEditing(true)}>
                    <h3 className="character-panel-header">Competencies</h3>
                    <ul className="sheet-listing gridded">
                        {allCharacterCompetencies.slice(0, 7).map(c => (
                            <li key={c.id}>
                                {c.name}{c.isExpert && <>&nbsp;<ExpertIcon /></>}
                            </li>
                        ))}
                        {allCharacterCompetencies.length > 7 && <li className="stopper">...more</li>}
                    </ul>
                </button>
            </div>
            <BreakdownWindow className="sheet-competencies-window" heading={<h1>Manage Competencies</h1>} visible={editing} close={() => setEditing(false)}>
                <SheetCompetencyEditor character={character} useCreationRestrictions />
            </BreakdownWindow>
        </>
    )
}