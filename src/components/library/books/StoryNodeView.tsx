import React from "react";
import { StoryNode } from "../../../entities/library/books/StoryNode"
import { Npc } from "../../../entities/library/books/NPC";
import { BookNpcView } from "./BookNpcView";
import { MarkdownContainer } from "../../theming/MarkdownContainer";
import { CollapsibleSection } from "../../articles/CollapsibleSection";

type Props = {
    node: StoryNode;
    npcs: Npc[];
}

export const StoryNodeView = (props: Props) => {
    const {id, name, description, npcIds} = props.node;
    const npcs = props.npcs.filter(npc => npcIds.contains(npc.id));
    return (
        <CollapsibleSection className="story-node" header={name}>
            <MarkdownContainer>{description}</MarkdownContainer>
            {npcs.map(npc => (
                <BookNpcView key={npc.id} npc={npc} />
            ))}
        </CollapsibleSection>
    );
}