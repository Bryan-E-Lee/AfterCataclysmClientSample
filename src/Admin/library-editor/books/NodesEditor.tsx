import React from "react";
import { StoryNode } from "../../../entities/library/books/StoryNode"
import { Npc } from "../../../entities/library/books/NPC";
import { CollapsibleSection } from "../../../components/articles/CollapsibleSection";
import { MarkdownContainer } from "../../../components/theming/MarkdownContainer";
import { MultiSelect } from "../../../components/inputs/selects/multiselect/MultiSelect";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { getUniqueIdentifier } from "../../../utils/GUID";
import { CollapsibleRegion } from "../../../components/articles/CollapsibleRegion";

const createStoryNode = (): StoryNode => ({
    id: getUniqueIdentifier(),
    name: "",
    description: "",
    npcIds: []
})

type Props = {
    nodes: StoryNode[];
    npcs: Npc[];
    onUpdate: (nodes: StoryNode[]) => unknown;
}

export const NodesEditor = (props: Props) => {
    const { nodes, npcs, onUpdate } = props;
    const createSubUpdater = (index: number) => {
        return (node: StoryNode) => {
            nodes.splice(index, 1, node);
            onUpdate([...nodes]);
        }
    }
    return (
        <CollapsibleRegion header="Nodes">
            <ThemedButton onClick={() => onUpdate([...nodes, createStoryNode()])}>
                Add Node
            </ThemedButton>
            {nodes.map((node, index) => <NodeEditor key={node.id} node={node} npcs={npcs} onUpdate={createSubUpdater(index)} />)}
            <ThemedButton onClick={() => onUpdate([...nodes, createStoryNode()])}>
                Add Node
            </ThemedButton>
        </CollapsibleRegion>
    );
}


type NodeEditorProps = {
    node: StoryNode;
    npcs: Npc[];
    onUpdate: (node: StoryNode) => unknown;
}

const NodeEditor = (props: NodeEditorProps) => {
    const { node, npcs, onUpdate } = props;
    const npcOptions = npcs.map(npc => ({ name: npc.name, value: npc.id }));
    return (
        <CollapsibleSection header={node.name}>
            <div className="form-field">
                <label>Name</label>
                <input type="text" value={node.name} onChange={e => onUpdate({ ...node, name: e.target.value })} />
            </div>

            <div className="form-field">
                <label>Description</label>
                <textarea value={node.description} onChange={e => onUpdate({ ...node, description: e.target.value })}></textarea>
                <CollapsibleSection header="Preview" expandedInitially>
                    <MarkdownContainer>{node.description}</MarkdownContainer>
                </CollapsibleSection>
            </div>

            <div className="form-field">
                <label>NPCs</label>
                <MultiSelect options={npcOptions} selections={node.npcIds}
                    onChange={options => onUpdate({ ...node, npcIds: options })}>
                </MultiSelect>
            </div>
        </CollapsibleSection>
    );
}