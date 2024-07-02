import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Character } from "../../../../../entities/characters/Character";
import { SheetActions } from "../../../../../store/stores/characters/sheet/actions/Sheet.Actions";

type Props = { character: Character }

export const CharacterNameEditor: React.FC<Props> = (props: Props) => {
    const dispatch = useDispatch();
    const [currentName, setCurrentName] = useState<string>(props.character.name);
    return (
        <div className='form-field'>
            <label>Name:</label>
            <input type='text' value={currentName}
                onChange={(e) => setCurrentName(e.target.value)}
                onBlur={(e) => dispatch(SheetActions.updateName(e.target.value))}/>
        </div>
    );
}