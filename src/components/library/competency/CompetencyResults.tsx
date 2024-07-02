import React, { useState } from "react";
import { CompetencyInitializer } from "../../../entities/characters/Competencies"
import { NoFilterResults } from "../../filtering/NoFilterResults";
import { CollapsibleSection } from "../../articles/CollapsibleSection";
import { ThemedButton } from "../../inputs/buttons/ThemedButton";
import { MarkdownContainer } from "../../theming/MarkdownContainer";

type Props = {
    competencies: CompetencyInitializer[];
    close?: () => unknown;
}

export const CompetencyResults = (props: Props) => {
    const { competencies, close } = props;

    const [expandeds, setExpandeds] = useState<boolean[]>(competencies.map(_ => false));
    const createSetExpanded = (index: number) => {
        return (expanded: boolean) => {
            expandeds.splice(index, 1, expanded);
            setExpandeds([...expandeds]);
        }
    }

    if (competencies.length == 0) {
        return <NoFilterResults />;
    }

    const allExpanded = expandeds.every(e => e);
    const toggleAll = () => setExpandeds(competencies.map(_ => !allExpanded));

    return (
        <section className="search-results">
            <div>
                <ThemedButton onClick={toggleAll}>
                    {!allExpanded && "Expand All"}
                    {allExpanded && "Collapse All"}
                </ThemedButton>
            </div>
            <div>
                {competencies.map((competency, index) => (
                    <CollapsibleSection key={competency.id} header={competency.name}
                        overrideExpanded={expandeds[index]}
                        onToggle={createSetExpanded(index)}>
                        <MarkdownContainer>{competency.description}</MarkdownContainer>
                    </CollapsibleSection>
                ))}
            </div>
        </section>
    )
}