import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Character } from "../../../../../entities/characters/Character";
import { SheetActions } from "../../../../../store/stores/characters/sheet/actions/Sheet.Actions";

type Props = {
    character: Character;
    level: number;
}

export const LevelEditor: React.FC<Props> = (props: Props) => {
    const { character, level } = props;
    const dispatch = useDispatch();
    const [currentLevel, setLevel] = useState<number>(level);
    return (
        <div className="form-field">
            <label>Level:</label>
            <input type="number" min={Character.MinLevel} max={Character.MaxLevel}
                step={1} value={currentLevel} onChange={(e) => setLevel(parseInt(e.target.value ?? 1))}
                onBlur={(e) => dispatch(SheetActions.updateLevel(character, parseInt(e.target.value ?? 1)))} />
        </div>
    );
}