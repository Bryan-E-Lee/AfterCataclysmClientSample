import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Character } from "../../../../entities/characters/Character";
import { SheetActions } from "../../../../store/stores/characters/sheet/actions/Sheet.Actions";
import { ThemedCheckbox } from "../../../inputs/checkbox/ThemedCheckbox";

type Props = { character: Character }

export const JuiceIndicator: React.FC<Props> = (props: Props) => {
    const { character } = props;
    const dispatch = useDispatch();
    return (                
        <div className="metric-container">
            <div className="juice metric" role="button">
                    
                <label>Juiced?</label>
                <div className="value">
                    <ThemedCheckbox checked={character.juiced ?? true} setChecked={(checked) => dispatch(SheetActions.setJuiced(character, checked))} />
                </div>
            </div>
        </div>
    );
}