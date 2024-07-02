import "./mod-slot-preview.scss";
import React from "react";
import { useDispatch } from "react-redux";
import { Character } from "../../../../../../../entities/characters/Character";
import { Item } from "../../../../../../../entities/library/items/Item";
import { ModSlot } from "../../../../../../../entities/library/items/mods/ModSlot";
import { SheetActions } from "../../../../../../../store/stores/characters/sheet/actions/Sheet.Actions";
import { DeleteIcon } from "../../../../../../icons";
import { Loader } from "../../../../../../theming/loader/Loader";

type Props = {
    character?: Character;
    item?: Item;
    slot: ModSlot;
    editable?: boolean;
    custom?: boolean;
}

export const ModSlotPreview = (props: Props) => {
    const { character, item, slot, editable, custom } = props;

    const mod = item?.mods.first(m => m.assignedSlotId == slot.id)
        ?? item?.containedItems.mapMany(ci => ci.mods).first(m => m.assignedSlotId == slot.id);

    const dispatch = useDispatch();

    const canDelete = editable && character && mod != null;
    const deleteMod = () => {
        dispatch(SheetActions.removeMod(character!, item!, mod!));
    }

    const onClick = () => {
        if (item != null && item.saved && editable) {
            dispatch(SheetActions.setPreviewSlot(slot.id, item.instanceId))
        }
    }

    const modSaved = mod?.saved ?? true;

    return (
        <div className={`sheet-slot ${custom ? "custom-slot" : ""} ${item?.saved ? 'editable' : 'not-editable'} ${modSaved ? 'enabled' : 'disabled'}`}>
            <div className="text bottom">
                {mod?.name ?? "Empty"}
                {canDelete && (
                    <button className="delete-button" onClick={deleteMod} disabled={!modSaved}>
                        {mod.saved && <DeleteIcon />}
                        {!mod.saved && <Loader dimension={16} />}
                    </button>
                )}
            </div>
            {(item?.saved || !editable) && 
                <button className="slot-box interactable-button" onClick={onClick} disabled={!editable || !modSaved}>
                    {mod?.iconElement ?? "+"}
                </button>
            }
            {!item?.saved && editable &&
                <button className="slot-box">
                    <Loader />
                </button>
            }
            {/* {canDelete && <ThemedButton className="delete-mod-button" onClick={deleteMod}>Delete</ThemedButton>} */}
            <div className="text top">
                {slot.slotTypes.join(", ")}
            </div>
        </div>
    );
}