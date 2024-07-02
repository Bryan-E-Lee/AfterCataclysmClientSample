import "./character-sheet-rhetorics.scss";
import React, { useState } from "react";
import { Character } from "../../../../../entities/characters/Character";
import { OwnedRhetoricInitializer, Rhetoric, RhetoricPriority } from "../../../../../entities/library/socials/Rhetoric";
import { RhetoricSheetComponent } from "./RhetoricSheetComponent";
import { BreakdownWindow } from "../../../../theming/breakdown-window";
import { RhetoricValueModifiers } from "./window/RhetoricValueModifiers";
import { RhetoricAdjustment } from "./window/RhetoricAdjustment";
import { RhetoricOverride } from "./window/RhetoricOverride";
import { BaseRhetoric } from "./window/BaseRhetoric";
import { CloseIcon, EditIcon } from "../../../../icons";
import { ThemedRadio } from "../../../../inputs/radio/ThemedRadio";
import { useDispatch } from "react-redux";
import { SheetRhetoricActions } from "../../../../../store/stores/characters/sheet/actions/SheetRhetoricActions";
import { Unarrayed } from "../../../../../utils/TypeUtils";

type Props = {
    character: Character;
    viewOnMobile: boolean;
}

type RhetoricPriorityOption = {
    name: string;
    display: string;
    priority: RhetoricPriority;
}
const PrimaryOption: RhetoricPriorityOption = { name: "Primary", display: "1st", priority: RhetoricPriority.Primary };
const SecondaryOption: RhetoricPriorityOption = { name: "Secondary", display: "2nd", priority: RhetoricPriority.Secondary };
const TertiaryOption: RhetoricPriorityOption = { name: "Tertiary", display: "3rd", priority: RhetoricPriority.Tertiary };
const RhetoricPriorityOptions = [
    PrimaryOption,
    SecondaryOption,
    TertiaryOption,
];

const GetSelectedRhetoricOption = (rhetoric: OwnedRhetoricInitializer) => {
    switch (rhetoric.priority) {
        case RhetoricPriority.Primary:
            return PrimaryOption;
        case RhetoricPriority.Secondary:
            return SecondaryOption;
        case RhetoricPriority.Tertiary:
            return TertiaryOption;
        default:
            return undefined;
    }
}

export const CharacterSheetRhetorics: React.FC<Props> = (props: Props) => {
    const { character, viewOnMobile } = props;
    const dispatch = useDispatch();
    const [selectedRhetoric, setRhetoric] = useState<Rhetoric | null>(null);
    const [editing, setEditing] = useState(false);
    const editRhetorics = () => {
        setEditing(true);
    }
    const cancelEdit = () => {
        setEditing(false);
    }
    const createPriorityUpdater = (rhetoric: Rhetoric) => {
        return (option: RhetoricPriorityOption) => {
            dispatch(SheetRhetoricActions.updateRhetoricPriority(character, rhetoric, option.priority));
        }
    }
    return (
        <div className={`character-sheet-rhetorics sheet-section ${viewOnMobile ? "viewing" : "unviewing"}`}>
            <h3 className="character-panel-header">
                <div className="flex">
                    <div className="fill">Rhetorics</div>
                    {editing && <button className="interactable-button close" onClick={cancelEdit}><CloseIcon /></button>}
                    {!editing && <button className="interactable-button" onClick={editRhetorics}><EditIcon /></button>}
                </div>
            </h3>
            {editing &&
                <div className="rhetorics">
                    {character.rhetorics.collection.map(rhetoric => (
                        <div key={rhetoric.id} className="rhetoric-wrapper">
                            <div className="center-flexed vertical">
                                <label className="fancy">{rhetoric.name}</label>
                                <div>
                                    <ThemedRadio className="text-options" options={RhetoricPriorityOptions} onChange={createPriorityUpdater(rhetoric)} selected={GetSelectedRhetoricOption(rhetoric)} nullable />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
            {!editing &&
                <div className="rhetorics">
                    {character.rhetorics.collection.map(rhetoric => (
                        <div key={rhetoric.id} className="rhetoric-wrapper">
                            <RhetoricSheetComponent character={character}
                                rhetoric={rhetoric} onClick={() => setRhetoric(rhetoric)} />
                        </div>
                    ))}
                </div>
            }
            <BreakdownWindow visible={selectedRhetoric != null} close={() => setRhetoric(null)}
                heading={<h1>{selectedRhetoric?.name}</h1>}>
                {selectedRhetoric && <div className="value-summary">
                    <div className="value-modifier total">
                        <label>Total:</label>
                        <div className="value">{selectedRhetoric?.getLevel(character)}</div>
                    </div>
                    <RhetoricValueModifiers character={character} rhetoric={selectedRhetoric} />
                    <RhetoricAdjustment character={character} rhetoric={selectedRhetoric} />
                    <RhetoricOverride character={character} rhetoric={selectedRhetoric} />
                    <BaseRhetoric rhetoric={selectedRhetoric} />
                </div>}
            </BreakdownWindow>
        </div>
    );
}