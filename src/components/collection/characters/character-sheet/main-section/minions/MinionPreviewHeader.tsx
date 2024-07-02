import React, { useRef, useState } from "react";
import { Minion } from "../../../../../../entities/library/minions/Minion";
import { useDispatch } from "react-redux";
import { SheetActions } from "../../../../../../store/stores/characters/sheet/actions/Sheet.Actions";
import { Character } from "../../../../../../entities/characters/Character";
import { EditIcon } from "../../../../../icons";

type Props = {
    character: Character;
    minionId: string;
}

export const MinionPreviewHeader = (props: Props) => {
    const { character, minionId } = props;
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);
    const [editing, setEditing] = useState<boolean>(false);
    const minion = character.minions.get(minionId);
    const [customName, setCustomName] = useState<string | undefined>(minion?.customName);
    if (minion == null) {
        return null;
    }
    return (
         <header className="minion-preview-header">
            {editing && <>
                <input type="text" ref={inputRef} className={editing ? 'visible' : 'hidden'}
                    value={customName ?? ""}
                    onChange={(e) => setCustomName(e.target.value)}
                    onBlur={(e) => {
                        dispatch(SheetActions.updateMinionCustomName(character, minion, e.target.value));
                        setEditing(false);
                    }} />
                    &nbsp;
                </>
            }
            <span className={editing ? "visible" : "hidden"}>({minion.name})&nbsp;</span>
            <span className={editing ? "hidden" : "visible"}>{minion.displayName}&nbsp;</span>

            <button className="interactable-button" onClick={() => setEditing(true)}>
                <EditIcon />
            </button>
         </header>
    );
}