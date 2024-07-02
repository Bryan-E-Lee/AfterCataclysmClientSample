import { Book } from "../../../entities/library/books/Book";

type BooksLoaded = { type: 'BOOKS_LOADED', books: Book }

export type BookAction = BooksLoaded;