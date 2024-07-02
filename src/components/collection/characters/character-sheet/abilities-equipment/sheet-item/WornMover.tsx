import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Character } from "../../../../../../entities/characters/Character"
import { Item } from "../../../../../../entities/library/items/Item";
import { SheetActions } from "../../../../../../store/stores/characters/sheet/actions/Sheet.Actions";
import { ThemedButton } from "../../../../../inputs/buttons/ThemedButton";

type Props = { 
    character: Character;
    item: Item;
}

type State = {
    viewReplacements: boolean;
    toBeReplaced: Item[];
}

export const WornMover: React.FC<Props> = (props: Props) => {
    const { character, item } = props;
    const dispatch = useDispatch();
    const [state, setState] = useState<State>({
        viewReplacements: false,
        toBeReplaced: [],
    });

    const wornCollisions = character.worn.collection
        .filter(w => character.enforceRules && w.wornOn.intersection(item.wornOn).any());
    
    const onWearClick = () => {
        if (!character.enforceRules || character.couldWearItem(item)) {
            dispatch(SheetActions.wearItem(character, item));
        }
        else {
            setState({ ...state, viewReplacements: true });
        }
    }

    const onReplaceClick = () => {
        dispatch(SheetActions.wearItem(character, item, state.toBeReplaced));
        setState({ ...state, viewReplacements: false });
    }

    return (
        <>
            <button className="option" onClick={onWearClick}>
                Wear
            </button>
            <div className={`sub-menu ${state.viewReplacements ? 'visible' : 'hidden'}`}>
                <div>
                    Slots to Clear:
                    <ul>
                        {item.wornOn.filter(wo => {
                                const sum = wornCollisions.count(wc => wc.wornOn.includes(wo));
                                return sum >= character.getWornLimitForSlot(wo);
                            })
                            .map(wo => <li>{wo}</li>)
                        }
                    </ul>
                </div>
                {wornCollisions.map(wc => (
                    <div>
                        <input type="check" onChange={onWearClick}
                            checked={state.toBeReplaced.contains(wc)} />
                        {wc.name} ({wc.wornOn.join(', ')})
                    </div>
                ))}
                <ThemedButton onClick={onReplaceClick}
                    disabled={!character.couldWearItem(item, state.toBeReplaced)}>
                    Replace
                </ThemedButton>
            </div>
        </>
    );
}