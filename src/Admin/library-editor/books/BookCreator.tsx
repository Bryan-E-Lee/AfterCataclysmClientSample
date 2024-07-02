import React from "react";
import { useState } from "react"
import { Book, DefaultBook } from "../../../entities/library/books/Book"
import { BookStateSetter } from "./BookStateSetter";
import { useDispatch } from "react-redux";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { BookEditorShared } from "./BookEditorShared";
import { useNavigate } from "react-router";

export const BookCreator = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState<Book>({
        ...DefaultBook
    });

    const stateSetter = new BookStateSetter(setState);
    const onSave = () => dispatch(AdminLibraryActions.createBook(state, (id: string) => navigate(`${id}/Edit`)));
    return (
        <>
            <h1>Create Book</h1>
            <ThemedButton onClick={onSave}>
                Create
            </ThemedButton>
            <BookEditorShared book={state} stateSetter={stateSetter} />
            <ThemedButton onClick={onSave}>
                Create
            </ThemedButton>
        </>
    )
}