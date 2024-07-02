 import React from "react";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { ActiveAbility } from "../../../entities/abilities/ActiveAbility";
import { CollapsibleRegion } from "../../../components/articles/CollapsibleRegion";
import { ActiveAbilityCreator, DefaultActiveAbility } from "./ActiveAbilityCreator";

type Props = {
    actions: ActiveAbility[];
    namePostFix?: string;
    update: (actions: ActiveAbility[]) => unknown;
}

export const ActiveAbilityCollectionCreator: React.FC<Props> = (props: Props) => {
    const { actions, update, namePostFix } = props;
    return (
        <div>
            {props.actions.map((active, index) => (
                <ActiveEditor key={active?.id ?? index} action={active} namePostFix={namePostFix}
                    onUpdate={(active) => {
                        const currentActions = [...actions];
                        currentActions.splice(index, 1, active);
                        update(currentActions);
                    }}
                    onDelete={() => {
                        const currentActions = [...actions];
                        currentActions.splice(index, 1);
                        update(currentActions);
                    }} />
            ))}
            <ThemedButton onClick={() => update([
                ...actions, ({ ...DefaultActiveAbility })
            ])}>
                + Add Action
            </ThemedButton>
        </div>
    );
}

type EditorProps = {
    action: ActiveAbility;
    namePostFix?: string;
    onUpdate: (active: ActiveAbility) => void;
    onDelete: () => void;
};

const ActiveEditor: React.FC<EditorProps> = (props: EditorProps) => {
    const { action, namePostFix, onUpdate, onDelete } = props;
    return (
        <CollapsibleRegion header={`${action.name} ${namePostFix ?? ""}`}>
            <ThemedButton onClick={() => onDelete()}>
                Delete
            </ThemedButton>
            <ActiveAbilityCreator action={action} onUpdate={onUpdate} />
            <ThemedButton onClick={() => onDelete()}>
                Delete
            </ThemedButton>
        </CollapsibleRegion>
    );
}