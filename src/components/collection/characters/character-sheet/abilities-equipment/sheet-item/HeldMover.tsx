import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Character } from "../../../../../../entities/characters/Character";
import { Weapon } from "../../../../../../entities/library/items/weapons/Weapon";
import { SheetActions } from "../../../../../../store/stores/characters/sheet/actions/Sheet.Actions";
import { ThemedButton } from "../../../../../inputs/buttons/ThemedButton";

type Props = {
    character: Character;
    weapon: Weapon;
}

type State = {
    viewReplacements: boolean;
    toBeReplaced: Weapon[];
}

export const HeldMover: React.FC<Props> = (props: Props) => {
    const { character, weapon } = props;
    const dispatch = useDispatch();
    const [state, setState] = useState<State>({
        viewReplacements: false,
        toBeReplaced: [],
    });

    const held = character.held.collection;
    const handsRemaining = character.maxHands - state.toBeReplaced.sum(h => h.totalHandsUsed);

    const onHoldClick = () => {
        if (!character.enforceRules || character.couldHoldItem(weapon)) {
            dispatch(SheetActions.holdItem(character, weapon));
        }
        else {
            setState({ ...state, viewReplacements: true });
        }
    };

    const onCheckClick = (weapon: Weapon) => {
        if (!state.toBeReplaced.contains(weapon)) {
            setState({ ...state, toBeReplaced: [...state.toBeReplaced, weapon]});
        }
        else {
            setState({
                ...state,
                toBeReplaced: state.toBeReplaced.filter(h => h.instanceId != weapon.instanceId)
            });
        }
    }

    const onReplaceClick = () => {
        dispatch(SheetActions.holdItem(character, weapon, state.toBeReplaced));
        setState({ ...state, viewReplacements: false, toBeReplaced: [] });
    }
    
    return (
        <>
            <button className="option" onClick={onHoldClick}>
                Hold
            </button>
            <div className={`sub-menu ${state.viewReplacements ? 'visible' : 'hidden'}`}>
                <div>
                    {handsRemaining} hands available.
                </div>
                {held.map(h => (
                    <div key={h.instanceId}>
                        <input type="check" checked={state.toBeReplaced.contains(h)}
                            onChange={() => onCheckClick(h)} />
                        <label>{h.displayName} ({h.totalHandsUsed} hands)</label>
                    </div>
                ))}
                <ThemedButton onClick={onReplaceClick}
                    disabled={!character.couldHoldItem(weapon, state.toBeReplaced)}>
                    Replace
                </ThemedButton>
            </div>
        </>
    );
}