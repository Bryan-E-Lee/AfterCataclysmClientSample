import React, { useState } from "react";
import { PerkInitializer } from "../../../entities/library/perks/Perk"
import { NoFilterResults } from "../../filtering/NoFilterResults";
import { ObjectIcons } from "../../icons";
import { CollapsibleSection } from "../../articles/CollapsibleSection";
import { ThemedButton } from "../../inputs/buttons/ThemedButton";
import { MarkdownContainer } from "../../theming/MarkdownContainer";

type Props = {
    perks: PerkInitializer[];
    close?: () => unknown;
}

export const PerkResults = (props: Props) => {
    const { perks, close } = props;

    const [expandeds, setExpandeds] = useState<boolean[]>(perks.map(_ => false));
    const createSetExpanded = (index: number) => {
        return (expanded: boolean) => {
            expandeds.splice(index, 1, expanded);
            setExpandeds([...expandeds]);
        }
    }

    if (perks.length == 0) {
        return <NoFilterResults />
    }

    const allExpanded = expandeds.every(e => e);
    const toggleAll = () => setExpandeds(perks.map(_ => !allExpanded));

    return (
        <section className="search-results">
            <div>
                <ThemedButton onClick={toggleAll}>
                    {!allExpanded && "Expand All"}
                    {allExpanded && "Collapse All"}
                </ThemedButton>
            </div>
            <div>
                {perks.map((perk, index) => (
                    <CollapsibleSection key={perk.id} header={<header>{ObjectIcons.GetIcon(perk.icon)}{perk.name}</header>}
                        overrideExpanded={expandeds[index]} onToggle={createSetExpanded(index)}>
                        <MarkdownContainer>{perk.description}</MarkdownContainer>
                    </CollapsibleSection>
                ))}
            </div>
        </section>
    )
}