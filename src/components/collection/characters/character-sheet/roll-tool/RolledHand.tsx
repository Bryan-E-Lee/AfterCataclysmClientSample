import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Character } from "../../../../../entities/characters/Character";
import { DieFace } from "../../../../../entities/rolls/Roll";
import { ApplicationState } from "../../../../../store/stores/ApplicationState"
import { SheetActions } from "../../../../../store/stores/characters/sheet/actions/Sheet.Actions";
import { Die } from "../../../../figures/Die";
import { ThemedButton } from "../../../../inputs/buttons/ThemedButton";

type Props = { character: Character }

type State = {
    rerolls: number[];
    rerolled: boolean;
}

export const RolledHand: React.FC<Props> = (props: Props) => {
    const { character } = props;
    const { hand, rollSkill } = useSelector((app: ApplicationState) => app.sheet);
    const [state, setState] = useState<State>({
        rerolls: [],
        rerolled: false
    });
    const { rerolls, rerolled } = state;

    const dispatch = useDispatch();
    
    useEffect(() => {
        if (hand.length == 0) {
            dispatch(SheetActions.rollHand());
        }
    }, [dispatch]);

    const skillRoller = character.skills.collection.find(s => s.name == rollSkill)?.roller;
    const maxRerolls = skillRoller?.rerolls ?? 0;
    const rerollsRemaining = maxRerolls - rerolls.length;
    const extraRolls = skillRoller?.extraRolls ?? 0;
    const hasExtraRolls = extraRolls > 0;
    const extraRollText = hasExtraRolls ? <>Roll Extra Dice &<br/></> : '';
    const keepDisabled = rollSkill == null;
    const rerollDisabled = keepDisabled || rerolled;
    const rerollButtonDisabled = rerollDisabled || !rerolls.any();

    const onRollAgain = () => {
        dispatch(SheetActions.rollHand());
        setState({ ...state, rerolls: [] });
    }

    const onReroll = () => {
        dispatch(SheetActions.reroll(character, rerolls));
        setState({ ...state, rerolls: [], rerolled: true });
    }

    const reset = () => {
        dispatch(SheetActions.clearRollSkill());
        dispatch(SheetActions.reroll(character, []));
        setState({ ...state, rerolls: [], rerolled: false });
    }

    const createRerollToggle = (index: number) => {
        return () => {
            if (rerollDisabled) {
                return;
            }

            if (rerolls.contains(index)) {
                setState({ ...state, rerolls: rerolls.filter(r => r != index) });
            }
            else if (rerolls.length < maxRerolls) {
                setState({ ...state, rerolls: [...rerolls, index] });
            }
        }
    }
    return (
        <div className="rolled-hand">
            <ThemedButton className="reroll-button" onClick={onRollAgain}>
                Roll Again!
            </ThemedButton>

            {hand.map((roll, index) => (
                <RerollableDie key={index} faceValue={roll} selected={rerolls.contains(index)}
                    toggleForReroll={createRerollToggle(index)} disabled={rerollDisabled} />
            ))}

            {!rerolled && maxRerolls > 0 && <div>{rerollsRemaining} rerolls remaining.</div>}
            {!rerolled && maxRerolls <= 0 && <div>No rerolls available.</div>}

            <div className="button-container">
                {!rerolled &&
                    <>
                        <ThemedButton disabled={rerollButtonDisabled} onClick={onReroll}
                            title={rerollDisabled ? 'No rerolls remaining' : undefined}>
                            {extraRollText}Reroll Selected Dice
                        </ThemedButton>
                        <span>&nbsp;or&nbsp;</span>
                        <ThemedButton disabled={keepDisabled} onClick={() => setState({ ...state, rerolled: true })}>
                            Keep!
                        </ThemedButton>
                    </>
                }
                {rerolled &&
                    <>
                        <ThemedButton onClick={reset}>
                            Reset
                        </ThemedButton>
                    </>
                }
            </div>
        </div>
    );
}

type RerollableProps = {
    faceValue: DieFace;
    selected: boolean;
    toggleForReroll: () => unknown;
    disabled: boolean;
 }

const RerollableDie: React.FC<RerollableProps> = (props: RerollableProps) => {
    const { faceValue, selected, toggleForReroll, disabled } = props;
    return (
        <Die className={`interactable ${selected ? 'selected' : 'unselected'} ${disabled ? 'disabled' : 'enabled'}`} onClick={toggleForReroll} big>
            {faceValue}
        </Die>
    );
}