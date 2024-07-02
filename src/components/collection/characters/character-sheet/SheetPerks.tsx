import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Character } from "../../../../entities/characters/Character";
import { PerkInitializer } from "../../../../entities/library/perks/Perk";
import { ApplicationState } from "../../../../store/stores/ApplicationState";
import { SheetActions } from "../../../../store/stores/characters/sheet/actions/Sheet.Actions";
import { LibraryActions } from "../../../../store/stores/library/LibraryStore.Actions";
import { CollapsibleSection } from "../../../articles/CollapsibleSection";
import { ThemedCheckbox } from "../../../inputs/checkbox/ThemedCheckbox";
import { BreakdownWindow } from "../../../theming/breakdown-window";
import { MarkdownContainer } from "../../../theming/MarkdownContainer";

type Props = {
    character: Character;
}

type State = {
    editing: boolean;
    filter: string;
}

export const SheetPerks = (props: Props) => {
    const { character } = props;
    const dispatch = useDispatch();
    const { perks, allPerksLoaded } = useSelector((app: ApplicationState) => app.library);

    const [state, setState] = useState<State>({
        editing: false,
        filter: ''
    });
    const { editing, filter } = state;

    useEffect(() => {
        if (!allPerksLoaded) {
            dispatch(LibraryActions.loadPerks());
        }
    }, [dispatch, allPerksLoaded]);

    const remainingPerks = Math.max(0, Math.floor(character.level / 2 - character.perks.count));
    const perksPlural = remainingPerks != 1;

    const disabled = character.level <= 1;
    return (
        <div className="sheet-perks">
            <button className="sheet-toggles perks interactable-button" disabled={disabled}
                onClick={() => setState({ ...state, editing: true })}>
                <h3 className="character-panel-header">Perks</h3>
                <ul className="sheet-listing">
                    {character.perks.collection.map(p => (
                        <li key={p.id}>
                            {p.name}
                        </li>
                    ))}
                </ul>
            </button>
            <BreakdownWindow heading={<h1>Manage Perks</h1>} visible={editing} close={() => setState({ ...state, editing: false })}>
                {remainingPerks} perk{perksPlural && 's'} can still be assigned.
                <div>
                    <label>Filter:</label>&nbsp;
                    <input type="text" value={filter}
                        onChange={(e) => setState({ ...state, filter: e.target.value })} />
                </div>
                {perks.map(p => (
                    <CollapsibleSection key={p.id} header={<PerkHeader character={character} perk={p} />}>
                        <MarkdownContainer>{p.description}</MarkdownContainer>
                    </CollapsibleSection>
                ))}
            </BreakdownWindow>
        </div>
    );
}

type HeaderProps = {
    character: Character;
    perk: PerkInitializer;
}

const PerkHeader = (props: HeaderProps) => {
    const { character, perk } = props;
    const dispatch = useDispatch();
    const mappedPerk = character.perks.get(perk.id);

    const toggle = (checked: boolean) => {
        if (checked) {
            dispatch(SheetActions.addPerk(character, perk));
        }
        else {
            dispatch(SheetActions.removePerk(character, mappedPerk!));
        }
    }

    const checked = mappedPerk != null;
    const noMoreAssignmentsPossible = character.perks.count >= Math.floor(character.level / 2);
    return (
        <>
            <span className="name flex-fill">{perk.name}</span>
            <ThemedCheckbox checked={checked} setChecked={toggle} disabled={!checked && noMoreAssignmentsPossible} suppressBubble />
        </>
    );
}