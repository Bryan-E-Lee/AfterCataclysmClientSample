import { Book } from "../../../entities/library/books/Book"

export type BookState = {
    books: Book[]
}

export const BookDefaultState: BookState = {
    books: []
}