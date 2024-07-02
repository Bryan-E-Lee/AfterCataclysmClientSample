import React, { useState } from "react";
import { Condition } from "../../../entities/characters/Conditions"
import { NoFilterResults } from "../../filtering/NoFilterResults";
import { CollapsibleSection } from "../../articles/CollapsibleSection";
import { ThemedButton } from "../../inputs/buttons/ThemedButton";
import { MarkdownContainer } from "../../theming/MarkdownContainer";

type Props = {
    conditions: Condition[];
}

export const ConditionResults = (props: Props) => {
    const { conditions } = props;

    const [expandeds, setExpandeds] = useState<boolean[]>(conditions.map(_ => false));
    const createSetExpanded = (index: number) => {
        return (expanded: boolean) => {
            expandeds.splice(index, 1, expanded);
            setExpandeds([...expandeds]);
        }
    }

    if (conditions.length == 0) {
        return <NoFilterResults />
    }

    const allExpanded = expandeds.every(e => e);
    const toggleAll = () => setExpandeds(conditions.map(_ => !allExpanded));

    return (
        <section className="search-results">
            <div>
                <ThemedButton onClick={toggleAll}>
                    {!allExpanded && "Expand All"}
                    {allExpanded && "Collapse All"}
                </ThemedButton>
            </div>
            <div>
                {conditions.map((condition, index) => (
                    <CollapsibleSection key={condition.id} header={condition.name}
                        overrideExpanded={expandeds[index]} onToggle={createSetExpanded(index)}>
                        <MarkdownContainer>{condition.description}</MarkdownContainer>
                    </CollapsibleSection>
                ))}
            </div>
        </section>
    )
}