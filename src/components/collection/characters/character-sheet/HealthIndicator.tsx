import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Character } from "../../../../entities/characters/Character";
import { SheetActions } from "../../../../store/stores/characters/sheet/actions/Sheet.Actions";
import { ExternalClickDetector } from "../../../../utils/events/ExternalClickDetector";
import { EditIcon } from "../../../icons";
import { ThemedButton } from "../../../inputs/buttons/ThemedButton";
import { HealthIcon } from "../../../icons/CharacterIcons";

type Props = { character: Character }

type State = {
    editing: boolean;
    changeBy: number;
}

export const HealthIndicator: React.FC<Props> = (props: Props) => {
    const { character } = props;
    const dispatch = useDispatch();
    const [state, setState] = useState<State>({
        editing: false,
        changeBy: 0
    });
    const close = () => setState({ ...state, editing: false, changeBy: 0 });
    const onHeal = () => {
        const newHealth = character.currentHealth + state.changeBy;
        dispatch(SheetActions.updateHealth(character, newHealth));
        close();
    }
    const onHurt = () => {
        const newHealth = character.currentHealth - state.changeBy;
        dispatch(SheetActions.updateHealth(character, newHealth));
        close();
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const changeBy = parseInt(e.target.value);
        if (!isNaN(changeBy)) {
            setState({ ...state, changeBy });
        }
    }
    return (
        <div className="metric-container">
            <div className="health metric interactable-button" role="button" onClick={() => setState({ ...state, editing: true })} >
                <label>Health&nbsp;<EditIcon /></label>
                <div className="value">
                    <HealthIcon />&nbsp;{character.currentHealth}/{character.maxHealth}
                </div>
            </div>
            {state.editing &&
                <ExternalClickDetector className="metric-editor option-window"
                    onExternalClickDetected={close}>
                    <div className="title">
                        Update Health
                    </div>
                    <div className="editor">
                        <ThemedButton className="increase-button" onClick={onHeal}>
                            Heal
                        </ThemedButton>
                        <input type="number" value={state.changeBy} onChange={onChange} min={0} />
                        <ThemedButton className="decrease-button" onClick={onHurt}>
                            Hurt
                        </ThemedButton>
                    </div>
                </ExternalClickDetector>
            }
        </div>
    );
}