import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Character } from "../../../../../entities/characters/Character";
import { useState } from "react";
import { ApplicationState } from "../../../../../store/stores/ApplicationState";
import { ModInitializer, isModInitializer } from "../../../../../entities/library/items/ItemInitializers";
import { Mod, isMod } from "../../../../../entities/library/items/mods/Mod";
import { IsLegalModForSlot } from "../../../../../entities/library/items/mods/ModSlot";
import { SheetActions } from "../../../../../store/stores/characters/sheet/actions/Sheet.Actions";
import { BreakdownWindow } from "../../../../theming/breakdown-window";
import { ItemPreviewHeader } from "../../character-tools/items/preview/ItemPreviewHeader";
import { ItemPreview } from "../../character-tools/items/preview/ItemPreview";
import { CollapsibleSection } from "../../../../articles/CollapsibleSection";
import { MiniMod } from "../abilities-equipment/item-editor/slots/MiniModComponent";
import { ThemedButton } from "../../../../inputs/buttons/ThemedButton";

type Props = {
    character: Character;
    slotId: string;
    close: () => unknown;
}

type BodyModLocation = "Inventory" | "Available";

export const SheetBodyMods = (props: Props) => {
    const { character, slotId, close } = props;
    const dispatch = useDispatch();
    const [filter, setFilter] = useState("");
    const [previewSelectionMod, setPreviewSelectionMod] = useState<ModInitializer | undefined>(undefined);
    const [modFrom, setModFrom] = useState<BodyModLocation>("Inventory");
    const slot = character.bodySlots.first(s => s.id == slotId);

    const { enforceRules } = useSelector((app: ApplicationState) => app.sheet);
    const { items } = useSelector((app: ApplicationState) => app.library);

    if (slot == null) {
        throw new Error("No slot selected.");
    }

    const allMods = items.filter(isModInitializer);

    const existingMod = character.bodyMods.first(m => m.assignedSlotId == slotId);
    const legalModsInInventory = character.mods
        .filter(m => m.assignedSlotId == null)
        .filter(m => m.tags.contains('Body'))
        .filter(m => !enforceRules || IsLegalModForSlot(slot, m))
        .filter(m => Mod.FilterByName(m, filter))
        .filter(m => m.id != existingMod?.id);

    const legalModsAvailable = allMods
        .filter(m => !legalModsInInventory.any(mii => mii.id == m.id))
        .filter(m => m.tags.contains('Body'))
        .filter(m => !enforceRules || IsLegalModForSlot(slot, m))
        .filter(m => Mod.FilterByName(m, filter))
        .filter(m => m.id != existingMod?.id);

    const inventoryModClick = (clickedMod: Mod) => {
        setModFrom("Inventory");
        setPreviewSelectionMod(clickedMod);
    }

    const availableModClick = (clickedMod: ModInitializer) => {
        setModFrom("Available");
        setPreviewSelectionMod(clickedMod);
    }

    const onSelectMod = () => {
        if (previewSelectionMod == undefined) {
            return;
        }
        if (modFrom == "Inventory" && isMod(previewSelectionMod)) {
            dispatch(SheetActions.assignBodyMod(character, previewSelectionMod, slotId));
        }
        else if (modFrom == "Available") {
            dispatch(SheetActions.addAndAssignBodyMod(character, previewSelectionMod, slotId));
        }
        else {
            throw new Error("Attempt to assign an inventory mod to body that was not instantiated.");
        }
        setPreviewSelectionMod(undefined);
        close();
    }

    const closeBodyModWindow = () => {
        if (previewSelectionMod == undefined) {
            close();
        }
    }

    const closeModView = () => {
        setPreviewSelectionMod(undefined);
    }
    return (
        <>
            <BreakdownWindow className="mod-options" close={closeBodyModWindow} heading={<h1>Body Mods</h1>}>
                <div>
                    <label className="standout">Mods</label>&nbsp;
                    <input type="text" placeholder="Filter..." value={filter} onChange={(e) => setFilter(e.target.value)} />
                </div>
                {existingMod && (
                    <div className="current-mod">
                        <ItemPreviewHeader character={character} item={existingMod}>
                            <span>Currently Assigned:&nbsp;</span>
                        </ItemPreviewHeader>
                        <ItemPreview character={character} item={existingMod} />
                    </div>
                )}

                <div className="options">
                    {legalModsInInventory.any() &&
                        <CollapsibleSection className="mod-options-section" header={<header>Mods In Inventory:</header>}
                            expandedInitially={!legalModsInInventory.any()}
                            collapsible={legalModsInInventory.any()}>
                            {legalModsInInventory.map(mod => <MiniMod key={mod.id} mod={mod} onClick={() => inventoryModClick(mod)} />)}
                        </CollapsibleSection>}
                    {legalModsAvailable.any() &&
                        <CollapsibleSection className="mod-options-section" header={<header>Mods Not In Inventory</header>}
                            expandedInitially={!legalModsInInventory.any()}
                            collapsible={legalModsInInventory.any()}>
                            {legalModsAvailable.map(mod => <MiniMod key={mod.id} mod={mod} onClick={() => availableModClick(mod)} />)}
                        </CollapsibleSection>}
                </div>
            </BreakdownWindow>

            {previewSelectionMod &&
                <BreakdownWindow className="mod-detail-view" close={closeModView}>
                    <ItemPreviewHeader character={character} item={previewSelectionMod} />
                    <ItemPreview item={previewSelectionMod} />
                    <ThemedButton onClick={onSelectMod}>
                        Assign {previewSelectionMod.name} to Slot
                    </ThemedButton>
                </BreakdownWindow>
            }
        </>
    )
}