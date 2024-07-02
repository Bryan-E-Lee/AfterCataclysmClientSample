import React, { useState } from "react";
import { NoFilterResults } from "../../filtering/NoFilterResults";
import { CollapsibleSection } from "../../articles/CollapsibleSection";
import { PersonalityInitializer } from "../../../entities/library/socials/Personality";
import { ThemedButton } from "../../inputs/buttons/ThemedButton";
import { MarkdownContainer } from "../../theming/MarkdownContainer";

type Props = {
    personalities: PersonalityInitializer[];
    close?: () => unknown;
}

export const PersonalityResults = (props: Props) => {
    const { personalities, close } = props;

    const [expandeds, setExpandeds] = useState<boolean[]>(personalities.map(_ => false));
    const createSetExpanded = (index: number) => {
        return (expanded: boolean) => {
            expandeds.splice(index, 1, expanded);
            setExpandeds([...expandeds]);
        }
    }

    if (personalities.length == 0) {
        return <NoFilterResults />
    }

    const allExpanded = expandeds.every(e => e);
    const toggleAll = () => setExpandeds(personalities.map(_ => !allExpanded));

    return (
        <section className="search-results">
            <div>
                <ThemedButton onClick={toggleAll}>
                    {!allExpanded && "Expand All"}
                    {allExpanded && "Collapse All"}
                </ThemedButton>
            </div>
            <div>
                {personalities.map((condition, index) => (
                    <CollapsibleSection key={condition.id} header={condition.name}
                        overrideExpanded={expandeds[index]} onToggle={createSetExpanded(index)}>
                        <MarkdownContainer>{condition.description}</MarkdownContainer>
                    </CollapsibleSection>
                ))}
            </div>
        </section>
    )
}