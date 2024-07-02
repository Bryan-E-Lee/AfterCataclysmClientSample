import React from "react";
import { Breadcrumbs } from "../navigation/BreadCrumbs";
import { BooksRoute, LibraryRootRoute } from "../navigation/LibraryRoutes";
import { useLocation, useParams } from "react-router";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../../store/stores/ApplicationState";
import { Loader } from "../../theming/loader/Loader";
import { decodeNameFromURI } from "../../../utils/StringUtilities";
import { SortedSet } from "../../../entities/data-structures/SortedSet";
import { MarkdownContainer } from "../../theming/MarkdownContainer";
import { BookChapterView } from "./BookChapterView";

export const BookView = () => {
    const location = useLocation();
    const params = useParams();
    const { books, allBooksLoaded } = useSelector((app: ApplicationState) => app.library);
    if (!allBooksLoaded) {
        return <Loader />
    }

    let bookName = params["name"] as string | undefined;
    if (bookName == undefined) {
        throw new Error("No book name provided.");
    }
    bookName = decodeNameFromURI(bookName);

    const set = new SortedSet(books);
    const book = set.getByName(bookName);
    if (book == undefined) {
        throw new Error("No book found.");
    }

    const { name, published, description, chapters } = book;
    const publishDate = new Date(published);
    return (
        <>
            <Breadcrumbs crumbs={[LibraryRootRoute, BooksRoute, {path: location.pathname, name: bookName}]} />
            <h1>{bookName}</h1>
            <em>Published {publishDate.toDateString()}</em>
            <MarkdownContainer>{description}</MarkdownContainer>
            {chapters.map(chapter => (
                <BookChapterView key={chapter.id} chapter={chapter} chapters={chapters} npcs={book.npcs} />
            ))}
        </>
    );
}