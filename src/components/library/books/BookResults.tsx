import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { ApplicationState } from "../../../store/stores/ApplicationState";
import { Loader } from "../../theming/loader/Loader";
import { NoFilterResults } from "../../filtering/NoFilterResults";
import { Link } from "react-router-dom";
import { encodeNameForURI } from "../../../utils/StringUtilities";

export const BookResults = () => {
    const location = useLocation();
    const params = useParams();
    const { books, allBooksLoaded } = useSelector((app: ApplicationState) => app.library);
    if (!allBooksLoaded) {
        return <Loader />
    }
    else if (books.length == 0) {
        return <NoFilterResults />
    }

    return (
        <section>
            <h1>Books</h1>
            <ul>
                {books.map(b => (
                    <li key={b.id}>
                        <Link to={encodeNameForURI(b.name)}>{b.name}</Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}