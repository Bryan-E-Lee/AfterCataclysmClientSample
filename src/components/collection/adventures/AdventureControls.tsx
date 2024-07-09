import React from "react";
import { CommunalDice, LocalAdventure } from "../../../entities/adventures/Adventure"
import { ThemedButton } from "../../inputs/buttons/ThemedButton";
import { useDispatch } from "react-redux";
import { AdventureActions } from "../../../store/stores/adventures/AdventureStore.Actions";
import { EditableDie } from "../../inputs/EditableDie";
import { DieFace } from "../../../entities/rolls/Roll";

type Props = {
    adventure: LocalAdventure;
}

export const AdventureControls = (props: Props) => {
    const { adventure } = props;
    const dispatch = useDispatch();
    const createDieUpdater = (index: 0 | 1) => {
        return (face: DieFace) => {
            const dice: CommunalDice = [...adventure.communalDice];
            dice.splice(index, 1, face);
            dispatch(AdventureActions.setCommunalDice(adventure.id, dice));
        }
    }
    return (
        <div className="communal-rolls">
            <label className="standout">Communal Dice</label>
            <div>
                <EditableDie faceValue={adventure.communalDice[0]} rolling={adventure.rolling} onChange={createDieUpdater(0)} />
                <EditableDie faceValue={adventure.communalDice[1]} rolling={adventure.rolling} onChange={createDieUpdater(1)} />
            </div>
            <ThemedButton onClick={() => dispatch(AdventureActions.rollCommunalDice(adventure.id))}>Roll New Dice</ThemedButton>
        </div>
    )
}