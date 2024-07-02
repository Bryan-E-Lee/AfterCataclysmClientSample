import React, { useEffect } from "react";
import { useState } from "react"
import { Book, DefaultBook } from "../../../entities/library/books/Book"
import { BookStateSetter } from "./BookStateSetter";
import { useDispatch, useSelector } from "react-redux";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { BookEditorShared } from "./BookEditorShared";
import { AdminState } from "../../store/stores/AdminState";
import { useParams } from "react-router";
import { SortedSet } from "../../../entities/data-structures/SortedSet";
import { Loader } from "../../../components/theming/loader/Loader";

export const BookEditor = () => {
    const dispatch = useDispatch();
    const [state, setState] = useState<Book>({
        ...DefaultBook
    });
    const {books, allBooksLoaded} = useSelector((app: AdminState) => app.library);
    const params = useParams();
    useEffect(() => {
        if (!books.any()) {
            return;
        }
        const id = params["id" as keyof typeof params] as string | undefined;
        if (id == undefined) {
            throw new Error('Attempt to edit null identified book.');
        }
        const set = new SortedSet(books);
        const book = set.get(id);
        if (book == null) {
            throw new Error(`Attempt to edit unknown book with id ${id}`);
        }
        setState(book);
    }, [params, books]);

    const stateSetter = new BookStateSetter(setState);
    const onSave = () => dispatch(AdminLibraryActions.updateBook(state));
    return (
        <>
            <h1>Update Book</h1>
            {!allBooksLoaded && (
                <div>
                    <Loader></Loader>
                    <br />
                    Loading
                </div>
            )}
            {allBooksLoaded && (
                <>
                    <ThemedButton onClick={onSave}>
                        Save
                    </ThemedButton>
                    <BookEditorShared book={state} stateSetter={stateSetter} />
                    <ThemedButton onClick={onSave}>
                        Save
                    </ThemedButton>
                </>
            )}
        </>
    )
}