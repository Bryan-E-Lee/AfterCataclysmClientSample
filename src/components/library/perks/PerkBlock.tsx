import React from "react";
import { PerkInitializer } from "../../../entities/library/perks/Perk";
import { MarkdownContainer } from "../../theming/MarkdownContainer";
import { TagsComponent } from "../../collection/characters/character-sheet/common/tags/TagsComponent";

type Props = { perk: PerkInitializer }

export const PerkBlock = (props: Props) => {
    const { perk } = props;
    const { name, description, tags } = perk;
    return (
        <div className="entity-view entity-panel">
            <header className="entity-panel-header">{name}</header>
            <MarkdownContainer>{description}</MarkdownContainer>
            <TagsComponent tags={tags} />
        </div>
    );
}