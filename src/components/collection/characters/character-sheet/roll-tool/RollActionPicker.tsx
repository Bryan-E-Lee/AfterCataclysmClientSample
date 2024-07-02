import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Character } from "../../../../../entities/characters/Character";
import { ApplicationState } from "../../../../../store/stores/ApplicationState";
import { SheetActions } from "../../../../../store/stores/characters/sheet/actions/Sheet.Actions";

type Props = { character: Character }

export const RollActionPicker: React.FC<Props> = (props: Props) => {
    const { character } = props;
    const dispatch = useDispatch();
    const selectedSkill = useSelector((app: ApplicationState) => app.sheet.rollSkill);
    return (
        <div className="roll-action-picker">
            <label className="standout">
                Pick a Skill:
            </label>
            {character.skills.collection.map(s => (
                <div key={s.id} onClick={() => dispatch(SheetActions.setRollSkill(s.name))}
                    className={`roll-skill ${s.name == selectedSkill ? 'selected' : 'unselected'}`}>
                    {s.name}
                </div>
            ))}
        </div>
    );
}