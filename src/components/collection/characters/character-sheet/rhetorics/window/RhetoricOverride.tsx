import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Character } from "../../../../../../entities/characters/Character";
import { Rhetoric } from "../../../../../../entities/library/socials/Rhetoric";
import { SheetActions } from "../../../../../../store/stores/characters/sheet/actions/Sheet.Actions";

type Props = { character: Character; rhetoric: Rhetoric; }

export const RhetoricOverride: React.FC<Props> = (props: Props) => {
    const { character, rhetoric } = props;
    const dispatch = useDispatch();
    const [override, setOverride] = useState<number | undefined>(rhetoric.override);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const setTo = parseInt(e.target.value);
        if (setTo > 0) {
            setOverride(setTo);
        }
        else {
            setOverride(undefined);
        }
    }
    const onBlur = () => dispatch(SheetActions.overrideRhetoric(character, rhetoric, override));
    return (
        <div className='value-modifier'>
            <label>Manual Override:</label>
            <input className='value' type='number'
                value={props.rhetoric?.override || 0}
                min={Rhetoric.MinValue} max={Rhetoric.MaxValue}
                onChange={onChange} onBlur={onBlur} />
        </div>
    );
}