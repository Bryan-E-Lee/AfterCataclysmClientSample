import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Character } from "../../../../entities/characters/Character"
import { Condition } from "../../../../entities/characters/Conditions";
import { ApplicationState } from "../../../../store/stores/ApplicationState";
import { SheetActions } from "../../../../store/stores/characters/sheet/actions/Sheet.Actions";
import { CollapsibleSection } from "../../../articles/CollapsibleSection";
import { BreakdownWindow } from "../../../theming/breakdown-window";
import { ThemedCheckbox } from '../../../inputs/checkbox/ThemedCheckbox';
import { LibraryActions } from "../../../../store/stores/library/LibraryStore.Actions";

type Props = { character: Character }

type State = {
    editing: boolean;
    filter: string;
}

export const SheetConditions: React.FC<Props> = (props: Props) => {
    const { character } = props;
    const dispatch = useDispatch();
    const { conditions, allConditionsLoaded } = useSelector((app: ApplicationState) => app.library);

    useEffect(() => {
        if (!allConditionsLoaded) {
            dispatch(LibraryActions.loadConditions());
        }
    }, [dispatch, allConditionsLoaded]);

    const [state, setState] = useState<State>({
        filter: '',
        editing: false,
    });

    return (
        <div className="sheet-conditions">
            <button className="sheet-toggles interactable-button" onClick={() => setState({ ...state, editing: true })}>
                <h3 className="character-panel-header">Conditions</h3>
                <ul className="sheet-listing">
                    {character.conditions.collection.slice(0, 4).map(c => <li key={c.id}>{c.name}</li>)}
                    {character.conditions.count >= 5 && <li className="stopper">...more</li>}
                </ul>
            </button>
            
            <BreakdownWindow heading={<h1>Manage Conditions</h1>} visible={state.editing}
                close={() => setState({ ...state, editing: false })}>
                <div>
                    <label>Filter:</label>&nbsp;
                    <input type="text" value={state.filter} 
                        onChange={(e) => setState({ ...state, filter: e.target.value })}/>
                </div>
                {conditions.map(c => (
                    <CollapsibleSection key={c.id} header={<ConditionHeader character={character} condition={c} />}>
                        <p>{c.description}</p>
                    </CollapsibleSection>
                ))}
            </BreakdownWindow>
        </div>
    );
}

type HeaderProps = { character: Character, condition: Condition }
const ConditionHeader: React.FC<HeaderProps> = (props: HeaderProps) => {
    const { character, condition } = props;
    const dispatch = useDispatch();
    const mappedCondition = character.conditions.get(condition.id);

    const toggle = (checked: boolean) => {
        if (checked) {
            dispatch(SheetActions.addCondition(character, condition));
        }
        else {
            dispatch(SheetActions.removeCondition(character, condition));
        }
    }

    return (
        <>
            <span className="name flex-fill">{condition.name}</span>
            <ThemedCheckbox checked={mappedCondition != null} setChecked={toggle} suppressBubble />
        </>
    )
}