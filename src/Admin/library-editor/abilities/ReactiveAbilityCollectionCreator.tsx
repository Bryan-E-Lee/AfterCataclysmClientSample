import React from "react";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { ReactiveAbility } from "../../../entities/abilities/ReactiveAbility";
import { CollapsibleRegion } from "../../../components/articles/CollapsibleRegion";
import { DefaultReactiveAbility, ReactiveAbilityCreator } from "./ReactiveAbilityCreator";

type Props = {
    reactions: ReactiveAbility[];
    namePostFix?: string;
    onUpdate: (reactions: ReactiveAbility[]) => void;
};

export const ReactiveAbilityCollectionCreator: React.FC<Props> = (props: Props) => {
    const { reactions, namePostFix, onUpdate } = props;
    return (
        <div>
            {reactions.map((reaction, index) => (
                <ReactionEditor key={reaction?.id ?? index} reaction={reaction} namePostFix={namePostFix}
                    onUpdate={reaction => {
                        reactions.splice(index, 1, reaction);
                        onUpdate([...reactions]);
                    }}
                    onDelete={() => {
                        reactions.splice(index, 1);
                        onUpdate([...reactions]);
                    }} />
            ))}
            <ThemedButton onClick={() => onUpdate([
                ...reactions,
                ({ ...DefaultReactiveAbility })
            ])}>
                + Add Reaction
            </ThemedButton>
        </div>
    );
}

type EditorProps = {
    reaction: ReactiveAbility;
    namePostFix?: string;
    onUpdate: (reaction: ReactiveAbility) => void;
    onDelete: () => void;
}

const ReactionEditor: React.FC<EditorProps> = (props: EditorProps) => {
    const { reaction, namePostFix, onUpdate, onDelete } = props;
    return (
        <CollapsibleRegion header={`${reaction.name} ${namePostFix ?? ""}`}>
            <ThemedButton onClick={() => onDelete()}>
                Delete
            </ThemedButton>
            <ReactiveAbilityCreator reaction={reaction} onUpdate={onUpdate} />
            <ThemedButton onClick={() => onDelete()}>
                Delete
            </ThemedButton>
        </CollapsibleRegion>
    );
}