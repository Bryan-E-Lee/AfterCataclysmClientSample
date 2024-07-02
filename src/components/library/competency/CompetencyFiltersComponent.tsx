import React, { useEffect, useState } from "react";
import { NameFilter } from "../../characters/items/filters/NameFilter";
import { CompetencyFilter, CompetencyFilterInitializer } from "../../../entities/filters/CompetencyFilter";
import { ObjectFilter } from "../../../entities/filters/ObjectFilter";
import { ThemedRadio } from "../../inputs/radio/ThemedRadio";
import { CompetencyCategory, CompetencyCategoryNames } from "../../../entities/characters/Competencies";
import { useLocation, useNavigate } from "react-router";

type Props = {
    onFilter: (filter: CompetencyFilterInitializer) => unknown;
    useRoute?: boolean;
}

type CategoryOption = {
    name: string;
    display: string;
    value: CompetencyCategory | null;
}

const allOption = {
    name: "All",
    display: "All",
    value: null
}

const explorationOption = {
    name: CompetencyCategoryNames[CompetencyCategory.Exploration],
    display: CompetencyCategoryNames[CompetencyCategory.Exploration],
    value: CompetencyCategory.Exploration
}

const socialOption = {
    name: CompetencyCategoryNames[CompetencyCategory.Social],
    display: CompetencyCategoryNames[CompetencyCategory.Social],
    value: CompetencyCategory.Social
}

const knowledgeOption = {
    name: CompetencyCategoryNames[CompetencyCategory.Knowledge],
    display: CompetencyCategoryNames[CompetencyCategory.Knowledge],
    value: CompetencyCategory.Knowledge
}

const technicalOption = {
    name: CompetencyCategoryNames[CompetencyCategory.Technical],
    display: CompetencyCategoryNames[CompetencyCategory.Technical],
    value: CompetencyCategory.Technical
}

const CategoryOptions = [
    allOption,
    explorationOption,
    socialOption,
    knowledgeOption,
    technicalOption
]

export const CompetencyFiltersComponent = (props: Props) => {
    const { onFilter, useRoute } = props;
    const navigate = useNavigate();
    const location = useLocation();

    let initialState: CompetencyFilterInitializer;
    if (useRoute) {
        const query = new URLSearchParams(location.search);
        initialState = CompetencyFilter.CreateFilterFromQuery(query).initializer;
    }
    else {
        initialState = CompetencyFilter.GetDefaultInitializer();
    }

    const [state, setState] = useState<CompetencyFilterInitializer>(initialState);
    const { name, category } = state;
    const [loaded, setLoaded] = useState(false);

    const search = (newState: CompetencyFilterInitializer) => {
        setState(newState);
        if (useRoute) {
            const query = new ObjectFilter(newState).generateQueryString();
            navigate(query, { replace: true });
        }
        onFilter(newState);
    }

    useEffect(() => {
        if (loaded) {
            return;
        }
        search(state);
        setLoaded(true);
    }, [loaded, setLoaded, state, search]);

    let selectedRadio: CategoryOption;
    switch (category) {
        case CompetencyCategory.Exploration:
            selectedRadio = explorationOption;
            break;
        case CompetencyCategory.Social:
            selectedRadio = socialOption;
            break;
        case CompetencyCategory.Knowledge:
            selectedRadio = knowledgeOption;
            break;
        case CompetencyCategory.Technical:
            selectedRadio = technicalOption;
            break;
        default:
            selectedRadio = allOption;
            break;
    }

    const onChange = (selection: CategoryOption) => {
        search({ ...state, category: selection.value });
    }
    return (
        <div className="filters">
            <div>
                <NameFilter name={name} onChange={name => search({ ...state, name })} />
            </div>
            <div>
                <label>Category:</label>
                <ThemedRadio className="text-options" options={CategoryOptions} selected={selectedRadio} onChange={onChange} />
            </div>
        </div>
    )
}