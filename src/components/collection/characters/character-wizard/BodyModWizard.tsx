import "./body-mod-wizard.scss";
import React, { useState } from "react";
import { Character } from "../../../../entities/characters/Character";
import { useDispatch, useSelector } from "react-redux";
import { isModInitializer, ModInitializer } from "../../../../entities/library/items/ItemInitializers";
import { Mod } from "../../../../entities/library/items/mods/Mod";
import { IsLegalModForSlot } from "../../../../entities/library/items/mods/ModSlot";
import { ApplicationState } from "../../../../store/stores/ApplicationState";
import { SheetActions } from "../../../../store/stores/characters/sheet/actions/Sheet.Actions";
import { ThemedButton } from "../../../inputs/buttons/ThemedButton";
import { BreakdownWindow } from "../../../theming/breakdown-window";
import { ItemPreview } from "../character-tools/items/preview/ItemPreview";
import { ItemPreviewHeader } from "../character-tools/items/preview/ItemPreviewHeader";
import { MiniMod } from "../character-sheet/abilities-equipment/item-editor/slots/MiniModComponent";
import { ArticleNavLink } from "../../../articles/navigation/article-navigation/ArticleNavLink";
import { PageNavigation } from "../../../articles/navigation/PageNavigation";
import { BodySlotPreview } from "../character-tools/items/preview/mods/BodySlotPreview";

type Props = {
    character: Character;
}

type State = {
    filter: string;
    previewSelectionMod?: ModInitializer;
    onSelectMod: () => unknown;
}

export const BodyModWizard = (props: Props) => {
    const { character } = props;

    const dispatch = useDispatch();
    const [state, setState] = useState<State>({
        filter: "",
        onSelectMod: () => {}
    });
    const { filter, previewSelectionMod, onSelectMod } = state;

    const slot = character.bodySlots.first();
    const { enforceRules } = useSelector((app: ApplicationState) => app.sheet);
    const { items } = useSelector((app: ApplicationState) => app.library);

    if (slot == null) {
        return null;
    }

    const allMods = items.filter(isModInitializer);
    
    const existingMod = character.bodyMods.first(m => m.assignedSlotId == slot.id);
    const legalModsAvailable = allMods
        .filter(m => m.tags.contains('Body'))
        .filter(m => !enforceRules || IsLegalModForSlot(slot, m))
        .filter(m => Mod.FilterByName(m, filter))
        .filter(m => m.id != existingMod?.id);

    const createAvailableModClick = (clickedMod: ModInitializer) => {
        return () => {
            setState({
                ...state,
                previewSelectionMod: clickedMod,
                onSelectMod: () => {
                    closeModView();
                    dispatch(SheetActions.addAndAssignBodyMod(character, clickedMod, slot.id))
                }
            });
        }
    }

    const closeModView = () => {
        setState({ ...state, previewSelectionMod: undefined });
    }

    const prev = new ArticleNavLink({
        path: `/Characters/${props.character.id}/Edit/Competencies`,
        name: 'Prev'
    });
    const next = new ArticleNavLink({
        path: `/Characters/${props.character.id}/Edit/Equipment`,
        name: 'Next'
    });
    
    return (
        <div className="character-wizard-editor body-mod-wizard">
            <PageNavigation prev={prev} next={next} />
            <div className="content">
                <h1>
                    Choose a Body Mod
                    <br />
                    <sub>(or remain unmodded)</sub>
                </h1>
                <div className="current-mod">
                    {existingMod && <ItemPreviewHeader character={character} item={existingMod}>
                        <span>Currently Assigned:&nbsp;</span>
                    </ItemPreviewHeader>}
                    {!existingMod && <h1>No Body Mod Assigned</h1>}
                    {character.bodySlots.map(slot => (
                        <BodySlotPreview key={slot.id} slot={slot} character={character} onClick={() => {}} />
                    ))}
                    {existingMod && <ItemPreview character={character} item={existingMod} />}
                </div>

                <div className="mod-searcher">
                    <label className="standout">Mods</label>&nbsp;
                    <input type="text" placeholder="Filter..." value={filter}
                        onChange={(e) => setState({ ...state, filter: e.target.value })} />
                </div>

                <div className="options">
                    {legalModsAvailable.map(mod => <MiniMod key={mod.id} mod={mod} onClick={createAvailableModClick(mod)} />)}
                </div>
            </div>
            <PageNavigation prev={prev} next={next} />
            {previewSelectionMod &&
                <BreakdownWindow className="mod-detail-view" close={closeModView}>
                    <ItemPreviewHeader character={character} item={previewSelectionMod} />
                    <ItemPreview item={previewSelectionMod} />
                    <ThemedButton onClick={onSelectMod}>
                        Assign {previewSelectionMod.name} to Slot
                    </ThemedButton>
                </BreakdownWindow>
            }
        </div>
    )
}