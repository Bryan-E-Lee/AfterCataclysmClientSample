import { Action, Reducer } from "redux";
import { BookAction } from "./BookStore.Actions";
import { BookDefaultState, BookState } from "./BookStore.State";

export const BookReducer: Reducer<BookState> = (state: BookState | undefined, incomingAction: Action): BookState => {
    if (state == undefined) {
        return BookDefaultState;
    }
    const action = incomingAction as BookAction;
    switch (action.type) {
        default:
            return state;
    }
}