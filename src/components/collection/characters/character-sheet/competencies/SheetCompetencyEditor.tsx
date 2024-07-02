import "./sheet-competency-editor.scss";
import React, { useEffect, useState } from "react"
import { CollapsibleSection } from "../../../../articles/CollapsibleSection"
import { ThemedButton } from "../../../../inputs/buttons/ThemedButton"
import { CompetencyFiltersComponent } from "../../../../library/competency/CompetencyFiltersComponent"
import { CustomCompetencyCreator } from "./CustomCompetencyCreator"
import { CompetencyFilter, CompetencyFilterInitializer } from "../../../../../entities/filters/CompetencyFilter"
import { CompetencyCategoryNames, CompetencyInitializer } from "../../../../../entities/characters/Competencies"
import { Character } from "../../../../../entities/characters/Character"
import { useDispatch, useSelector } from "react-redux"
import { SortedSet } from "../../../../../entities/data-structures/SortedSet"
import { LibraryActions } from "../../../../../store/stores/library/LibraryStore.Actions"
import { ApplicationState } from "../../../../../store/stores/ApplicationState"
import { SheetActions } from "../../../../../store/stores/characters/sheet/actions/Sheet.Actions"
import { ThemedCheckbox } from "../../../../inputs/checkbox/ThemedCheckbox"
import { Loader } from "../../../../theming/loader/Loader";

type CompetencyWindowMode = 'Filter' | 'Add';
type CustomDistinguishedCompetency = CompetencyInitializer & { isCustom: boolean }

type Props = {
    character: Character;
    useCreationRestrictions?: boolean;
}

export const SheetCompetencyEditor = (props: Props) => {
    const { character } = props;
    const {competencies, allCompetenciesLoaded} = useSelector((app: ApplicationState) => app.library);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!allCompetenciesLoaded) {
            dispatch(LibraryActions.loadCompetencies());
        }
    }, [dispatch, allCompetenciesLoaded]);
    const [windowMode, setWindowMode] = useState<CompetencyWindowMode>('Filter');
    const [filter, setFilter] = useState<CompetencyFilterInitializer>({
        name: "",
        category: null
    });
    const competencyFilter = new CompetencyFilter(filter);

    const allCompetencies = new SortedSet<CustomDistinguishedCompetency>([
        ...character.customCompetencies.collection.map(c => ({ ...c, isCustom: true })),
        ...competencies.map(c => ({ ...c, isCustom: false }))
    ]);
    const filteredCompetencies = competencyFilter.filter(allCompetencies.collection);
    return (
        <div className="competency-editor">
            <ThemedButton onClick={() => setWindowMode('Add')}>
                Add Custom Competency
            </ThemedButton>
            {windowMode == 'Add' && <CustomCompetencyCreator character={character} close={() => setWindowMode('Filter')} />}
            {windowMode == 'Filter' &&
                <>
                    <CompetencyFiltersComponent onFilter={c => setFilter({ ...c })}  />
                    {filteredCompetencies.map(c => (
                        <CollapsibleSection key={c.id} className={`competency ${c.isCustom && 'custom'}`}
                            header={<CompetencyHeader character={character} competency={c} />}>
                            {c.description}
                        </CollapsibleSection>
                    ))}
                </>
            }
        </div>
    )
}

type HeaderProps = {
    character: Character;
    competency: CompetencyInitializer;
}

const CompetencyHeader = (props: HeaderProps) => {
    const { character, competency } = props;
    const dispatch = useDispatch();
    const mappedCompetency = character.competencies.get(competency.id)
        ?? character.customCompetencies.get(competency.id);
    const toggle = () => {
        if (!mappedCompetency) {
            dispatch(SheetActions.addCompetency(character, competency));
        }
        else {
            dispatch(SheetActions.removeCompetency(character, mappedCompetency));
        }
    }
    const toggleExpert = () => {
        if (mappedCompetency != null) {
            dispatch(SheetActions.updateCompetencyLevel(character, mappedCompetency, !mappedCompetency.isExpert));
        }
    }

    const expertiseEnabled = mappedCompetency?.saved ?? false;
    const expertiseDisabled = !expertiseEnabled;
    return (
        <>
            <span className="name flex-fill">{competency.name} ({CompetencyCategoryNames[competency.category]})</span>
            {mappedCompetency != null && !mappedCompetency.saved && <Loader textSized />}
            <ThemedCheckbox checked={mappedCompetency != null} setChecked={toggle} suppressBubble />
            &nbsp;<span className={`${expertiseDisabled ? 'disabled' : 'enabled'}`}>Expert?</span>&nbsp;
            <ThemedCheckbox checked={mappedCompetency?.isExpert ?? false} setChecked={toggleExpert} disabled={expertiseDisabled} suppressBubble />
        </>
    )
}