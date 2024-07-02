import React, { useState } from "react";
import { Character } from "../../../../../../entities/characters/Character";
import { Minion } from "../../../../../../entities/library/minions/Minion";
import { ThemedButton } from "../../../../../inputs/buttons/ThemedButton";
import { MinionListing } from "./MinionListing";
import { MinionPicker } from "./MinionPicker";
import { BreakdownWindow } from "../../../../../theming/breakdown-window";
import { MinionPreview } from "./MinionPreview";
import { useDispatch } from "react-redux";
import { SheetActions } from "../../../../../../store/stores/characters/sheet/actions/Sheet.Actions";
import { MinionPreviewHeader } from "./MinionPreviewHeader";

type Props = {
    character: Character;
    minions: Minion[];
}

export const HordeComponent = (props: Props) => {
    const { character, minions } = props;
    const [showPicker, setPickerVisibility] = useState(false);
    const [previewMinionId, setPreviewMinionId] = useState<string | null>(null);
    const dispatch = useDispatch();
    const close = () => setPreviewMinionId(null);
    const previewMinion = character.minions.get(previewMinionId);
    const removeMinion = () => {
        const previewMinion = character.minions.get(previewMinionId);
        if (previewMinion == null) {
            return;
        }
        dispatch(SheetActions.removeMinion(character, previewMinion));
        close();
    }
    return (
        <>
            <ThemedButton onClick={() => setPickerVisibility(true)}
                disabled={minions.length >= character.maxHordeSize}>
                Add Minion
            </ThemedButton>
            {minions.map(m => <MinionListing key={m.instanceId} minion={m} character={character} onClick={() => setPreviewMinionId(m.instanceId)} />)}

            <MinionPicker character={character} visible={showPicker} close={() => setPickerVisibility(false)} />

            {previewMinion &&
                <BreakdownWindow heading={<MinionPreviewHeader character={character} minionId={previewMinion.instanceId} />} close={close}>
                    <MinionPreview character={character} minion={previewMinion} expanded />
                    <ThemedButton onClick={removeMinion}>
                        Remove Minion
                    </ThemedButton>
                </BreakdownWindow>
            }
        </>
    );
}