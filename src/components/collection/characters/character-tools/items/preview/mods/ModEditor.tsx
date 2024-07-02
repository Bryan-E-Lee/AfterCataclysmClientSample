import "./mod-editor.scss";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { ApplicationState } from "../../../../../../../store/stores/ApplicationState"
import { ItemPreviewHeader } from "../ItemPreviewHeader";
import { Character } from "../../../../../../../entities/characters/Character";
import { ItemPreview } from "../ItemPreview";
import { SheetActions } from "../../../../../../../store/stores/characters/sheet/actions/Sheet.Actions";
import { Item } from "../../../../../../../entities/library/items/Item";
import { MiniMod } from "../../../../character-sheet/abilities-equipment/item-editor/slots/MiniModComponent";
import { Mod } from "../../../../../../../entities/library/items/mods/Mod";
import { ModInitializer, isModInitializer } from "../../../../../../../entities/library/items/ItemInitializers";
import { BreakdownWindow } from "../../../../../../theming/breakdown-window";
import { CollapsibleSection } from "../../../../../../articles/CollapsibleSection";
import { ThemedButton } from "../../../../../../inputs/buttons/ThemedButton";
import { ModSlotPreview } from "./ModSlotPreview";
import { ModEditorTagFilter } from "./ModEditorTagFilter";
import { RecordStatus } from "../../../../../../../entities/RecordStatus";

type Props = {
    character?: Character;
    item: Item;
}

type State = {
    filter: string;
    previewSelectionMod?: ModInitializer;
    onSelectMod: () => unknown;
}

export const ModEditor = (props: Props) => {
    const { character, item } = props;
    const dispatch = useDispatch();
    const [state, setState] = useState<State>({
        filter: '',
        onSelectMod: () => {}
    });
    const [filterTags, setFilterTags] = useState<string[]>([]);
    
    const { filter, previewSelectionMod, onSelectMod } = state;
    const { previewSlotId: slotId, previewSlotItemInstanceId, enforceRules } = useSelector((app: ApplicationState) => app.sheet);
    const { items } = useSelector((app: ApplicationState) => app.library);

    const allMods = items.filter(isModInitializer);
    const slot = item.slots.first(s => s.id == slotId)
        ?? item.customSlots.first(s => s.id == slotId)
        ?? item.mods.mapMany(m => m.slots).first(s => s.id == slotId);

    if (slotId == null || slot == null || previewSlotItemInstanceId == null || character == null) {
        throw new Error("Mod editor received nothing to render.");
    }

    const assignedMod = item.mods.first(m => m.assignedSlotId == slotId);

    const close = () => {
        if (!previewSelectionMod) {
            dispatch(SheetActions.clearPreviewSlot());
        }
    }

    const modFilter = (mod: ModInitializer) => {
        const bodyFilter = !mod.tags.any(t => t == 'Body');
        const nameFilter = Mod.FilterByName(mod, filter);
        const tagFilter = !filterTags.any() || mod.tags.intersection(filterTags).any();
        const legalForCharacter = !enforceRules || Mod.IsLegalModForCharacter(mod, character);
        const legalForSlot = !enforceRules || item.isLegalModForSlot(mod, slotId);
        const notAlreadyAssigned = mod.id != assignedMod?.id;
        const isPublished = mod.recordStatus == RecordStatus.Published;

        return bodyFilter
            && nameFilter
            && tagFilter
            && legalForCharacter
            && legalForSlot
            && notAlreadyAssigned
            && isPublished;
    }

    const legalModsInInventory = character?.mods
        .filter(m => m.assignedSlotId == null)
        .filter(modFilter) ?? [];

    const createInventoryModClick = (clickedMod: Mod) => {
        return () => {
            setState({
                ...state,
                previewSelectionMod: clickedMod,
                onSelectMod: () => {
                    close();
                    dispatch(SheetActions.assignMod(character, item, clickedMod, slotId));
                }
            });
        }
    }

    const legalModsAvailable = allMods
        .filter(m => !legalModsInInventory.any(mii => mii.id == m.id))
        .filter(modFilter) ?? [];

    const createAvailableModClick = (clickedMod: ModInitializer) => {
        return () => {
            setState({
                ...state,
                previewSelectionMod: clickedMod,
                onSelectMod: () => {
                    close();
                    dispatch(SheetActions.addAndAssignMod(character, item, clickedMod, slotId));
                }
            })
        }
    }

    const closeModView = () => {
        setState({ ...state, previewSelectionMod: undefined });
    }
    return (
        <>
            <BreakdownWindow className='mod-options' heading="Select A Mod" close={close} visible={previewSelectionMod == null}>
                {assignedMod && <div className='current-mod'>
                    <ItemPreviewHeader character={character} item={assignedMod}>
                        <span>Currently Assigned:&nbsp;</span>
                    </ItemPreviewHeader>
                    <ModSlotPreview item={item} slot={slot} editable={false}/>
                    <ItemPreview character={character} item={assignedMod} />
                </div>}
                {assignedMod == undefined && <ModSlotPreview item={item} slot={slot} editable={false}/>}
                
                {!slot.slotTypes.any() && <ModEditorTagFilter tags={filterTags} onChange={(tags) => setFilterTags(tags)} />}
                <div className="mod-editor-filter">
                    <label className="standout">Mods:</label>&nbsp;
                    <input type="text" placeholder="Filter..." value={filter}
                        onChange={(e) => setState({ ...state, filter: e.target.value })} />
                </div>

                <div className="options">
                    {legalModsInInventory.any() &&
                        <CollapsibleSection className="mod-options-section" header={<header>Mods In Inventory</header>}
                            expandedInitially={legalModsInInventory.any()}
                            collapsible={legalModsAvailable.any()}>
                            {legalModsInInventory.map(mod => <MiniMod key={mod.id} mod={mod} onClick={createInventoryModClick(mod)} />)}
                        </CollapsibleSection>}
                    {legalModsAvailable.any() &&
                        <CollapsibleSection className="mod-options-section" header={<header>Mods Not In Inventory</header>}
                            expandedInitially={!legalModsInInventory.any()}
                            collapsible={legalModsInInventory.any()}>
                            {legalModsAvailable.map(mod => <MiniMod key={mod.id} mod={mod} onClick={createAvailableModClick(mod)} />)}
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