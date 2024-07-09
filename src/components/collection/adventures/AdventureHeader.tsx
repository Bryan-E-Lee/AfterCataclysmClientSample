import React, { useRef, useState } from "react"
import { useDispatch } from "react-redux";
import { Adventure } from "../../../entities/adventures/Adventure"
import { AdventureActions } from "../../../store/stores/adventures/AdventureStore.Actions";
import { EditIcon } from "../../icons";
import { ThemedButton } from "../../inputs/buttons/ThemedButton";
import { useNavigate } from "react-router";

type Props = { adventure: Adventure, isOwner: boolean };
type State = {
    editing: boolean;
    currentName: string;
}

export const AdventureHeader: React.FC<Props> = (props: Props) => {
    const { adventure, isOwner } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);

    const [state, setState] = useState<State>({
        editing: false,
        currentName: adventure.name
    });

    const confirmDeactivate = () => {
        if (confirm("Are you sure you want to deactivate this adventure?")) {
            dispatch(AdventureActions.deactivate(adventure.id));
        }
    }
    return (
        <h1 className="adventure-header">
            <div className="adventure-name">
                <span className={state.editing ? 'hidden' : 'visible'}>{adventure.name}</span>
                <input type="text" ref={inputRef} className={state.editing ? 'visible' : 'hidden'}
                    value={state.currentName}
                    onChange={(e) => setState({ ...state, currentName: e.target.value })}
                    onBlur={(e) => {
                        dispatch(AdventureActions.updateName(adventure, state.currentName));
                        setState({ ...state, editing: false });
                    }} />
                {isOwner && <button className="interactable-button" onClick={() => setState({ ...state, editing: true })}>
                                <EditIcon />
                            </button>}
            </div>
            {isOwner && <ThemedButton onClick={confirmDeactivate}>Deactivate</ThemedButton>}
            {!isOwner && <ThemedButton onClick={() => dispatch(AdventureActions.leave(adventure.id, () => navigate("/Adventures")))}>Leave Adventure</ThemedButton>}
        </h1>
    )
}