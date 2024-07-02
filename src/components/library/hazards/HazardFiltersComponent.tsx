import { ObjectFilter, ObjectFilterInitializer } from "../../../entities/filters/ObjectFilter"
import { useEffect, useState } from "react";
import { HazardFilter } from "../../../entities/filters/HazardFilter";
import React from "react";
import { NameFilter } from "../../characters/items/filters/NameFilter";
import { useLocation, useNavigate } from "react-router";

type Props = {
    onFilter: (filter: ObjectFilterInitializer) => unknown;
    useRoute?: boolean;
}

export const HazardFiltersComponent = (props: Props) => {
    const { onFilter, useRoute } = props;
    const navigate = useNavigate();
    const location = useLocation();

    let initialState: ObjectFilterInitializer;
    if (useRoute) {
        const query = new URLSearchParams(location.search);
        initialState = ObjectFilter.CreateFilterFromQuery(query).initializer;
    }
    else {
        initialState = ObjectFilter.GetDefaultInitializer();
    }

    const [state, setState] = useState<ObjectFilterInitializer>(initialState);
    const [loaded, setLoaded] = useState(false);

    const search = (newState: ObjectFilterInitializer) => {
        setState(newState);
        if (useRoute) {
            const query = new HazardFilter(newState).generateQueryString();
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
            <NameFilter name={state.name} onChange={(name) => search({ ...state, name })} />
        </div>
    )
}