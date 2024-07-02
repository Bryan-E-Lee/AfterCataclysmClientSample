import React, { useEffect, useState } from "react";
import { PerkFilter, PerkFilterInitializer } from "../../../entities/filters/PerkFilter";
import { NameFilter } from "../../characters/items/filters/NameFilter";
import { TagsFilter } from "../../characters/items/filters/TagsFilter";
import { useLocation, useNavigate } from "react-router";
type Props = {
    onFilter: (filter: PerkFilterInitializer) => unknown;
    useRoute?: boolean;
}

export const PerkFiltersComponent = (props: Props) => {
    const { onFilter, useRoute } = props;
    const navigate = useNavigate();
    const location = useLocation();

    let initialState: PerkFilterInitializer;
    if (useRoute) {
        const query = new URLSearchParams(location.search);
        initialState = PerkFilter.CreateFilterFromQuery(query).getInitializer();
    }
    else {
        initialState = PerkFilter.GetDefaultInitializer();
    }

    const [state, setState] = useState<PerkFilterInitializer>(initialState);
    const [loaded, setLoaded] = useState(false);

    const search = (newState: PerkFilterInitializer) => {
        setState(newState);
        if (useRoute) {
            const query = new PerkFilter(newState).generateQueryString();
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

    return (
        <div className="filters">
            <NameFilter name={state.name} onChange={name => search({ ...state, name })} />

            <TagsFilter tags={state.tags} onChange={tags => search({ ...state, tags })} />
        </div>
    )
}