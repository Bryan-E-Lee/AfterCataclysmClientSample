import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Character } from "../../../../../../entities/characters/Character";
import { ApplicationState } from "../../../../../../store/stores/ApplicationState";
import { BreakdownWindow } from "../../../../../theming/breakdown-window"
import { LibraryActions } from "../../../../../../store/stores/library/LibraryStore.Actions";
import { MinionPreview } from "./MinionPreview";
import { ThemedButton } from "../../../../../inputs/buttons/ThemedButton";
import { SheetActions } from "../../../../../../store/stores/characters/sheet/actions/Sheet.Actions";
import { CollapsibleSection } from "../../../../../articles/CollapsibleSection";

type Props = {
    character: Character
    visible: boolean;
    close: () => unknown;
}

export const MinionPicker = (props: Props) => {
    const { character, visible, close } = props;
    const { minions, allMinionsLoaded } = useSelector((app: ApplicationState) => app.library);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!allMinionsLoaded) {
            dispatch(LibraryActions.loadMinions());
        }
    }, [dispatch, allMinionsLoaded]);

    return (
        <BreakdownWindow visible={visible} close={close} heading={<h1>Grow Your Horde</h1>}>
            {minions.map(m => (
                <CollapsibleSection key={m.id} header={<>{m.name} ({m.creatureTypes.join(', ')})</>}>
                    <MinionPreview character={character} minion={m} />
                    <ThemedButton onClick={() => {
                        dispatch(SheetActions.addMinion(character, m));
                        close();
                    }}>
                        Recruit
                    </ThemedButton>
                </CollapsibleSection>
            ))}
        </BreakdownWindow>
    )
}