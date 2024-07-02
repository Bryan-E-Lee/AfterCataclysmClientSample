import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Character } from "../../../../../../entities/characters/Character";
import { Rhetoric } from "../../../../../../entities/library/socials/Rhetoric";
import { SheetActions } from "../../../../../../store/stores/characters/sheet/actions/Sheet.Actions";

type Props = { character: Character; rhetoric: Rhetoric; }

export const RhetoricAdjustment: React.FC<Props> = (props: Props) => {
    const { character, rhetoric } = props;
    const dispatch = useDispatch();
    const [adjustment, setAdjustment] = useState<number>(props.rhetoric.adjustment);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAdjustment(parseInt(e.target.value));
    }
    const onBlur = () => dispatch(SheetActions.adjustRhetoric(character, rhetoric, adjustment));
    const min = rhetoric.level - adjustment;
    const max = Rhetoric.MaxValue - (rhetoric.level + rhetoric.adjustment);
    return (
        <div className='value-modifier'>
            <label>Manual Adjustment:</label>
            <input className='value' type='number'
                value={adjustment} min={min} max={max}
                onChange={onChange} onBlur={onBlur} />
        </div>
    );
}