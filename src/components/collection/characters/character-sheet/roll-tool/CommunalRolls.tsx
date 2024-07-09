import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DieFace } from "../../../../../entities/rolls/Roll";
import { ApplicationState } from "../../../../../store/stores/ApplicationState";
import { SheetActions } from "../../../../../store/stores/characters/sheet/actions/Sheet.Actions";
import { EditableDie } from "../../../../inputs/EditableDie";

export const CommunalRolls: React.FC = () => {
    const dispatch = useDispatch();
    const communalRolls = useSelector((app: ApplicationState) => app.sheet.communalRolls);
    const onChange = (index: number, value: DieFace) => {
        communalRolls.splice(index, 1, value);
        dispatch(SheetActions.setCommunalRolls(communalRolls));
    }
    const onChangeFirst = (value: DieFace) => onChange(0, value);
    const onChangeSecond = (value: DieFace) => onChange(1, value);
    return (
        <div className="communal-rolls">
            <label className="standout">Communal Dice</label>
            <EditableDie faceValue={communalRolls[0]} onChange={onChangeFirst} />
            <EditableDie faceValue={communalRolls[1]} onChange={onChangeSecond} />
        </div>
    );
}