import { useDispatch } from "react-redux";
import { Character } from "../../../../../../../entities/characters/Character"
import { ModSlot } from "../../../../../../../entities/library/items/mods/ModSlot";
import React from "react";
import { SheetActions } from "../../../../../../../store/stores/characters/sheet/actions/Sheet.Actions";
import { DeleteIcon } from "../../../../../../icons";
import { Loader } from "../../../../../../theming/loader/Loader";

type Props = {
    character: Character;
    slot: ModSlot;
    onClick: () => unknown;
}

export const BodySlotPreview = (props: Props) => {
    const dispatch = useDispatch();
    const { character, slot, onClick } = props;

    const mod = character.bodyMods.first(m => m.assignedSlotId == slot.id);

    const canDelete = mod != null;
    const deleteMod = () => {
        if (canDelete) {
            dispatch(SheetActions.removeBodyMod(character, mod));
        }
    }

    const modSaved = mod?.saved ?? true;

    return (
        <div className={`sheet-slot ${modSaved ? "enabled" : "disabled"}`}>
            <div className="text">
                {mod?.name ?? 'Body Mod (Empty)'}
                {canDelete && (
                    <button className="delete-button" onClick={deleteMod} disabled={!modSaved}>
                        {modSaved && <DeleteIcon />}
                        {!modSaved && <Loader dimension={16} />}
                    </button>
                )}
            </div>
            <button className="slot-box interactable-button" onClick={onClick} disabled={!modSaved}>
                {mod?.iconElement ?? '+'}
            </button>
        </div>
    );
}