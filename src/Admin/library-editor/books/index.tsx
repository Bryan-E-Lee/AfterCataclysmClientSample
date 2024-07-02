import React, { useEffect } from "react";
import { BookCreator } from "./BookCreator";
import { BookEditor } from "./BookEditor";
import { Route, Routes } from "react-router";
import { AdminBooksView } from "./AdminBooksView";
import { useDispatch } from "react-redux";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";

export const AdminBooks = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(AdminLibraryActions.loadBooks());
    }, [dispatch]);
    return (
        <Routes>
            <Route path='Create/*' element={<BookCreator />} />
            <Route path=':id/Edit/*' element={<BookEditor />} />
            <Route path="*" element={<AdminBooksView />} />
        </Routes>
    )
}