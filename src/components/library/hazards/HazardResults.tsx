import { useState } from "react";
import { Hazard } from "../../../entities/library/hazards/Hazard";
import { NoFilterResults } from "../../filtering/NoFilterResults";
import React from "react";
import { ThemedButton } from "../../inputs/buttons/ThemedButton";
import { CollapsibleSection } from "../../articles/CollapsibleSection";
import { HazardBlock } from "../../../entities/library/hazards/HazardBlock";

type Props = {
    hazards: Hazard[];
}

export const HazardResults = (props: Props) => {
    const { hazards } = props;

    const [expandeds, setExpandeds] = useState<boolean[]>(hazards.map(_ => false));
    const createSetExpanded = (index: number) => {
        return (expanded: boolean) => {
            expandeds.splice(index, 1, expanded);
            setExpandeds([...expandeds]);
        }
    }

    if (expandeds.length == 0) {
        return <NoFilterResults />
    }

    const allExpanded = expandeds.every(e => e);
    const toggleAll = () => setExpandeds(hazards.map(_ => !allExpanded));

    return (
        <section className="search-results">
            <div>
                <ThemedButton onClick={toggleAll}>
                    {!allExpanded && "Expand All"}
                    {allExpanded && "Collapse All"}
                </ThemedButton>
            </div>
            <div>
                {hazards.map((hazard, index) => (
                    <CollapsibleSection key={hazard.id} header={hazard.name} overrideExpanded={expandeds[index]} onToggle={createSetExpanded(index)}>
                        <HazardBlock hazard={hazard} />
                    </CollapsibleSection>
                ))}
            </div>
        </section>
    )
}