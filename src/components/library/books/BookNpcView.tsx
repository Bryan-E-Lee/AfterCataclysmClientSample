import React from "react";
import { Npc } from "../../../entities/library/books/NPC"
import { MarkdownContainer } from "../../theming/MarkdownContainer";
import { CollapsibleSection } from "../../articles/CollapsibleSection";

type Props = {
    npc: Npc
}

export const BookNpcView = (props: Props) => {
    const {name, description, statBlockId} = props.npc;
    return (
        <CollapsibleSection header={name}>
            <MarkdownContainer>{description}</MarkdownContainer>
        </CollapsibleSection>
    )
}