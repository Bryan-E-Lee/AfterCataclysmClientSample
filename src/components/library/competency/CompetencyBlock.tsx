import React from "react";
import { MarkdownContainer } from "../../theming/MarkdownContainer";
import { CompetencyCategoryNames, CompetencyInitializer } from "../../../entities/characters/Competencies";

type Props = { competency: CompetencyInitializer };

export const CompetencyBlock = (props: Props) => {
    const { competency } = props;
    const { name, category, description } = competency;
    return (
        <div className="entity-view entity-panel">
            <header className="entity-panel-header">{name} ({CompetencyCategoryNames[category]})</header>
            <MarkdownContainer>{description}</MarkdownContainer>
        </div>
    )
}