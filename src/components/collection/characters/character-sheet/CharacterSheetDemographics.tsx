import "./character-sheet-demographics.scss";
import React, { useState } from "react"
import { Character } from "../../../../entities/characters/Character"
import { EditIcon } from "../../../icons"
import { HealthIndicator } from "./HealthIndicator";
import { JuiceIndicator } from "./JuiceIndicator";
import { BodySlotPreview } from "../character-tools/items/preview/mods/BodySlotPreview";
import { SheetBodyMods } from "./body/SheetBodyMods";
import { useDispatch, useSelector } from "react-redux";
import { SheetActions } from "../../../../store/stores/characters/sheet/actions/Sheet.Actions";
import { SingleSelect } from "../../../inputs/selects/singleselect/SingleSelect";
import { Kinships } from "../../../../entities/characters/Kinships";
import { ThemedButton } from "../../../inputs/buttons/ThemedButton";
import { ApplicationState } from "../../../../store/stores/ApplicationState";
import { Loader } from "../../../theming/loader/Loader";

type Props = {
    character: Character;
}

export const CharacterSheetDemographics: React.FC<Props> = (props: Props) => {
    const { character } = props;
    const dispatch = useDispatch();

    const [editing, setEditing] = useState(false);
    const [currentName, setCurrentName] = useState(character.name);
    const [currentLevel, setCurrentLevel] = useState(character.level);
    const [editBodySlot, setEditBodySlot] = useState<string | null>(null);

    const pendingProperties = useSelector((app: ApplicationState) => app.sheet.pendingProperties);
    const namePending = pendingProperties["name"],
        levelPending = pendingProperties["level"],
        kinshipPending = pendingProperties["kinship"];
    return (
        <>
            <div className="character-sheet-demographics sheet-section">
                {!editing && (
                    <>
                        <div className="main-info">
                            <div className="demographics">
                                <div className="name">
                                    {character.name}
                                    <button className="interactable-button" onClick={() => setEditing(!editing)}><EditIcon /></button>
                                </div>
                                <div className="description">
                                    <div className="level">
                                        <label>level</label>&nbsp;
                                        {character.level}
                                    </div>
                                    <div className="kinship">
                                        {character.kinship}
                                    </div>
                                    <div className="class-name">{character.className}</div>
                                </div>
                            </div>
                            <div className="sheet-metrics">
                                <HealthIndicator character={character} />
                                <JuiceIndicator character={character} />
                            </div>
                        </div>
                        
                        <div className="body-mods">
                            {character.bodySlots.map(slot => (
                                <BodySlotPreview key={slot.id} slot={slot} character={character} onClick={() => setEditBodySlot(slot.id)} />
                            ))}
                        </div>
                    </>
                )}
                {editing && (
                    <div className="main-info demographic-editor">
                        <label className="standout">Name:</label>
                        <div className="demographics-field">
                            <div className="demographics-field-container">
                                <input type='text' value={currentName} disabled={namePending}
                                    onChange={(e) => setCurrentName(e.target.value)}
                                    onBlur={(e) => dispatch(SheetActions.updateName(e.target.value))}/>
                                {namePending && <Loader textSized />}
                            </div>
                            &nbsp;
                            <ThemedButton onClick={() => setEditing(false)}>Done</ThemedButton>
                        </div>

                        <label className="standout">Level:</label>
                        <div className="demographics-field">
                            <div className="demographics-field-container">
                                <input type="number" min={Character.MinLevel} max={Character.MaxLevel} disabled={levelPending}
                                    step={1} value={currentLevel} onChange={(e) => setCurrentLevel(parseInt(e.target.value ?? 1))}
                                    onBlur={(e) => dispatch(SheetActions.updateLevel(character, parseInt(e.target.value ?? 1)))} />
                                {levelPending && <Loader textSized />}
                            </div>
                        </div>
                            
                        <label className="standout">Kinship:</label>
                        <div className="demographics-field">
                            <div className="demographics-field-container">
                                <SingleSelect className="kinship-selector" placeholder='Choose a Kinship' disabled={kinshipPending}
                                    options={Kinships.map(k => ({ name: k, value: k }))}
                                    selection={character.kinship}
                                    onChange={(selection) => dispatch(SheetActions.updateKinship(selection))} />
                                {kinshipPending && <Loader textSized />}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {editBodySlot && <SheetBodyMods character={character} close={() => setEditBodySlot(null)} slotId={editBodySlot} />}
        </>
        
    );
}