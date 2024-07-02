import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { ApplicationState } from "../../../store/stores/ApplicationState";
import { useEffect } from "react";
import { LibraryActions } from "../../../store/stores/library/LibraryStore.Actions";
import { ThemedButton } from "../../inputs/buttons/ThemedButton";
import { CollapsibleSection } from "../../articles/CollapsibleSection";
import { MarkdownContainer } from "../../theming/MarkdownContainer";

export const RhetoricsLibrary = () => {
    const dispatch = useDispatch();
    const { rhetorics, allRhetoricsLoaded } = useSelector((state: ApplicationState) => state.library);

    useEffect(() => {
        if (!allRhetoricsLoaded) {
            dispatch(LibraryActions.loadRhetorics());
        }
    }, [dispatch, allRhetoricsLoaded]);

    const [expandeds, setExpandeds] = useState<boolean[]>(rhetorics.map(_ => false));
    const createSetExpanded = (index: number) => {
        return (expanded: boolean) => {
            expandeds.splice(index, 1, expanded);
            setExpandeds([...expandeds]);
        }
    }

    const allExpanded = expandeds.every(e => e);
    const toggleAll = () => setExpandeds(rhetorics.map(_ => !allExpanded));
    
    return (
        <div>
            <h1>Rhetorics</h1>
            {allRhetoricsLoaded && (
                <section className="search-results">
                    <div>
                        <ThemedButton onClick={toggleAll}>
                            {!allExpanded && "Expand All"}
                            {allExpanded && "Collapse All"}
                        </ThemedButton>
                    </div>
                    <div>
                        {rhetorics.map((rhetoric, index) => (
                            <CollapsibleSection key={rhetoric.id} header={rhetoric.name}
                                overrideExpanded={expandeds[index]} onToggle={createSetExpanded(index)}>
                                <MarkdownContainer>{rhetoric.description}</MarkdownContainer>
                            </CollapsibleSection>
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}