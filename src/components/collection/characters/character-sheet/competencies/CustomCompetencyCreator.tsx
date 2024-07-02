import React, { useState } from "react"
import { Competency, CompetencyCategory, CompetencyCategoryOptions, DefaultCompetency } from "../../../../../entities/characters/Competencies"
import { ThemedCheckbox } from "../../../../inputs/checkbox/ThemedCheckbox";
import { SingleSelect } from "../../../../inputs/selects/singleselect/SingleSelect";
import { ThemedButton } from "../../../../inputs/buttons/ThemedButton";
import { useDispatch } from "react-redux";
import { SheetCompetencyActions } from "../../../../../store/stores/characters/sheet/actions/SheetCompetencyActions";
import { Character } from "../../../../../entities/characters/Character";
import { getUniqueIdentifier } from "../../../../../utils/GUID";

type Props = {
    character: Character;
    close: () => unknown;
}

export const CustomCompetencyCreator = (props: Props) => {
    const { character, close } = props;
    const dispatch = useDispatch();
    const [state, setState] = useState<Competency>({ ...DefaultCompetency, id: getUniqueIdentifier() });
    const add = () => {
        dispatch(SheetCompetencyActions.addCustomCompetency(character, state));
        setState({ ...DefaultCompetency });
        close();
    }
    return (
        <fieldset>
            <legend>Add Custom Competency</legend>
            <div className="form-field">
                <label>Name:</label>&nbsp;
                <input type="text" value={state.name} onChange={(e) => setState({ ...state, name: e.target.value })} />
            </div>
            <div className="form-field">
                <label>Description:</label>&nbsp;
                <textarea value={state.description} onChange={(e) => setState({ ...state, description: e.target.value })} />
            </div>
            <div className="form-field">
                <label>Expert?</label>&nbsp;
                <ThemedCheckbox checked={state.isExpert} setChecked={isExpert => setState({ ...state, isExpert })} />
            </div>
            <div className="form-field">
                <label>Category</label>
                <br/>
                <SingleSelect options={CompetencyCategoryOptions} selection={state.category}
                    onChange={(category: CompetencyCategory) => setState({ ...state, category })} />
            </div>
            <div>
                <ThemedButton onClick={add}>
                    Add
                </ThemedButton>
                &nbsp;
                <ThemedButton onClick={close}>
                    Cancel
                </ThemedButton>
            </div>
        </fieldset>
    )
}