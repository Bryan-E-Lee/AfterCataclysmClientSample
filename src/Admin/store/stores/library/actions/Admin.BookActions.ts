import { Book } from "../../../../../entities/library/books/Book";
import { ErrorToast, SuccessToast } from "../../../../../entities/toasts/Toasts";
import { ToastAction, ToastDispatchables } from "../../../../../store/stores/toasts/Toasts.Actions";
import { AdminThunkAction } from "../../AdminState";

type AdminBooksLoaded = { type: 'ADMIN_BOOKS_LOADED', books: Book[] }
type AdminBookCreate = { type: 'ADMIN_BOOK_CREATE', book: Book }
type AdminBookUpdate = { type: 'ADMIN_BOOK_UPDATE', book: Book }
type AdminBookDelete = { type: 'ADMIN_BOOK_DELETE', id: string }

export type AdminBookAction = AdminBooksLoaded | AdminBookCreate | AdminBookUpdate | AdminBookDelete;

export const BookActions = {
    loadBooks: (): AdminThunkAction<AdminBooksLoaded | ToastAction> =>
        async (dispatch, getState) => {
            const api = getState().api.books;
            try {
                const response = await api.getAll();
                if (response.status == 'Success') {
                    dispatch({ type: 'ADMIN_BOOKS_LOADED', books: response.payload });
                }
                else {
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },

    createBook: (book: Book, successCallback: (id: string) => unknown): AdminThunkAction<AdminBookCreate | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const api = getState().api.books;
                const response = await api.create(book);
                if (response.status == 'Success') {
                    dispatch({ type: 'ADMIN_BOOK_CREATE', book: response.payload });
                    successCallback(response.payload.id);
                    ToastDispatchables.toast(new SuccessToast(`${response.payload.name} created.`), dispatch);
                }
                else {
                    ToastDispatchables.toast(new ErrorToast(`Error creating ${book.name}.`), dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },

    updateBook: (book: Book): AdminThunkAction<AdminBookUpdate | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const api = getState().api.books;
                const response = await api.update(book);
                if (response.status == 'Success') {
                    ToastDispatchables.toast(new SuccessToast(`${response.payload.name} updated.`), dispatch);
                    dispatch({ type: 'ADMIN_BOOK_UPDATE', book: response.payload });
                }
                else {
                    ToastDispatchables.toast(new ErrorToast(`Error creating ${book.name}.`), dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },
    
    deleteBook: (book: Book): AdminThunkAction<AdminBookDelete | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const api = getState().api.books;
                const response = await api.delete(book.id);
                if (response.status == 'Success') {
                    ToastDispatchables.toast(new SuccessToast(`Successfully deleted ${book.name}.`), dispatch);
                    dispatch({ type: 'ADMIN_BOOK_DELETE', id: book.id });
                }
                else {
                    ToastDispatchables.toast(new ErrorToast(`Error deleting ${book.name}.`), dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        }
}