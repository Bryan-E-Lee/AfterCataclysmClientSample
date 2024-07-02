import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { ApplicationState } from "../../../store/stores/ApplicationState";
import { Route, Routes } from "react-router";
import { LibraryActions } from "../../../store/stores/library/LibraryStore.Actions";
import { BookView } from "./BookView";
import { BookResults } from "./BookResults";

export const BookLibrary = () => {
    const dispatch = useDispatch();
    const { books, allBooksLoaded } = useSelector((state: ApplicationState) => state.library);

    useEffect(() => {
        if (!allBooksLoaded) {
            dispatch(LibraryActions.loadAdventures());
        }
    })

    return (
        <Routes>
            <Route path=":name/*" element={<BookView />} />
            <Route path="*" element={<BookResults />} />
        </Routes>
    )
}