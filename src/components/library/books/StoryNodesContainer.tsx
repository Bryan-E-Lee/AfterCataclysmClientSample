import React from "react";
import { Npc } from "../../../entities/library/books/NPC";
import { StoryNode } from "../../../entities/library/books/StoryNode"
import { StoryNodeView } from "./StoryNodeView";

type Props = {
    nodes: StoryNode[];
    npcs: Npc[];
}

export const StoryNodesContainer = (props: Props) => {
    const { nodes, npcs } = props;
    return (
        <section className="story-nodes">
            <h2>Nodes</h2>
            {nodes.map(node => <StoryNodeView key={node.id} node={node} npcs={npcs} />)}
        </section>
    )
}