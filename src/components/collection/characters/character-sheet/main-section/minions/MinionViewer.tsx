import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Character } from "../../../../../../entities/characters/Character";
import { Minion } from "../../../../../../entities/library/minions/Minion"
import { SheetActions } from "../../../../../../store/stores/characters/sheet/actions/Sheet.Actions";
import { CollapsibleRegion } from "../../../../../articles/CollapsibleRegion";
import { EditIcon } from "../../../../../icons";
import { BreakdownWindow } from "../../../../../theming/breakdown-window";
import { CharacterAbilityView } from "../CharacterAbilityView";

type Props = {
    character: Character;
    minion: Minion;
    close: () => unknown;
    editable?: boolean;
}

export const MinionViewer = (props: Props) => {
    const { character, minion, close } = props;
    const actions = minion.getActionsForLevel(character);
    const reactions = minion.getActionsForLevel(character);
    const passives = minion.getPassivesForLevel(character);
    return (
        <BreakdownWindow close={close} heading={<MinionEditorHeader {...props} />}>
            <div>{minion.description}</div>
            <div>
                <label>Health:</label>
                <span>{minion.currentHealth}/{minion.getMaxHealth(character)}</span>
            </div>
            <div>
                <label>Notes:</label>
                <div>{minion.customNotes}</div>
            </div>
            <div>
                <label>Armor:</label>
                <span>{minion.armor}</span>
            </div>
            <div>
                <label>Resilience:</label>
                <span>{minion.resilience}</span>
            </div>
            {actions.any() && (
                <CollapsibleRegion header="Actions">
                    {actions.map(a => <CharacterAbilityView key={a.id} ability={a} />)}
                </CollapsibleRegion>
            )}
            {reactions.any() && (
                <CollapsibleRegion header="Reactions">
                    {reactions.map(r => <CharacterAbilityView key={r.id} ability={r} />)}
                </CollapsibleRegion>
            )}
            {passives.any() && (
                <CollapsibleRegion header="Passives">
                    {passives.map(p => <CharacterAbilityView key={p.id} ability={p} />)}
                </CollapsibleRegion>
            )}
        </BreakdownWindow>
    )
}

type HeaderState = {
    currentName?: string;
    editing: boolean;
}

const MinionEditorHeader = (props: Exclude<Props, 'close'>) => {
    const { character, minion, editable } = props;
    const dispatch = useDispatch();
    const [state, setState] = useState<HeaderState>({
        currentName: minion.customName,
        editing: false
    });
    const inputRef = useRef<HTMLInputElement>(null);
    const headerText = editable ? 'Editing:' : minion.displayName;

    return (
        <header>
            {headerText}
            <input type='text' ref={inputRef} className={state.editing ? 'visible' : 'hidden'}
                value={state.currentName ?? ''}
                onChange={(e) => setState({ ...state, currentName: e.target.value })}
                onBlur={(e) => {
                    dispatch(SheetActions.updateMinionCustomName(character, minion, state.currentName));
                    setState({ ...state, editing: false });
                }} />
            <span className={state.editing ? 'hidden' : 'visible'}>{minion.displayName}&nbsp;</span>
            <span className={state.editing ? 'visible' : 'hidden'}>({minion.name})</span>

            {editable && 
                <button className="interactable-button" onClick={() => setState({ ...state, editing: true  })}>
                    <EditIcon />
                </button>
            }
        </header>
    );
}