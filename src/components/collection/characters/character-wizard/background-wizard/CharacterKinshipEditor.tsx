import React from "react";
import { useDispatch } from "react-redux";
import { Kinship, Kinships } from "../../../../../entities/characters/Kinships";
import { SheetActions } from "../../../../../store/stores/characters/sheet/actions/Sheet.Actions";
import { SingleSelect } from "../../../../inputs/selects/singleselect/SingleSelect";

type Props = { kinship: Kinship };

export const CharacterKinshipEditor: React.FC<Props> = (props: Props) => {
    const dispatch = useDispatch();
    const options = Kinships.map(k => ({ name: k, value: k }));
    return (
        <div className='form-field'>
            <label>Kinship:</label>
            <SingleSelect placeholder='Choose a Kinship'
                options={options}
                selection={props.kinship}
                onChange={(selection) => dispatch(SheetActions.updateKinship(selection))} />
        </div>
    );
}