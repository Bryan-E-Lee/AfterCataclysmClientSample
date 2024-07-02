import React from "react";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { PassiveAbility } from "../../../entities/abilities/PassiveAbility";
import { CollapsibleRegion } from "../../../components/articles/CollapsibleRegion";
import { DefaultPassiveAbility, PassiveAbilityCreator } from "./PassiveAbilityCreator";

type Props = {
    passives: PassiveAbility[];
    namePostFix?: string;
    update: (passives: PassiveAbility[]) => void;
};

export const PassiveAbilityCollectionCreator: React.FC<Props> = (props: Props) => {
    const { passives, namePostFix, update } = props;
    return (
        <div>
            {passives.map((passive, index) => (
                <PassiveEditor key={passive?.id ?? index} passive={passive} namePostFix={namePostFix}
                    onUpdate={passive => {
                        const currentPassives = [...passives];
                        currentPassives.splice(index, 1, passive);
                        update(currentPassives);
                    }}
                    onDelete={() => {
                        const currentPassives = [...passives];
                        currentPassives.splice(index, 1);
                        update(currentPassives);
                    }} />
            ))}
            <ThemedButton onClick={() => update([
                    ...passives,
                    ({ ...DefaultPassiveAbility })
            ])}>
                + Add Passive
            </ThemedButton>
        </div>
    );
}

type EditorProps = {
    passive: PassiveAbility;
    namePostFix?: string;
    onUpdate: (passive: PassiveAbility) => void;
    onDelete: () => void;
}

const PassiveEditor: React.FC<EditorProps> = (props: EditorProps) => {
    const { passive, namePostFix, onUpdate, onDelete } = props;
    return (
        <CollapsibleRegion header={`${passive.name} ${namePostFix ?? ""}`}>
            <ThemedButton onClick={() => onDelete()}>
                Delete
            </ThemedButton>
            <PassiveAbilityCreator passive={passive} onUpdate={onUpdate} />
            <ThemedButton onClick={() => onDelete()}>
                Delete
            </ThemedButton>
        </CollapsibleRegion>
    );
}