import React from "react";
import { Breadcrumbs } from "../navigation/BreadCrumbs";
import { BooksRoute, LibraryRootRoute } from "../navigation/LibraryRoutes";
import { Route, Routes, useLocation, useParams } from "react-router";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../../store/stores/ApplicationState";
import { Loader } from "../../theming/loader/Loader";
import { decodeNameFromURI, encodeNameForURI } from "../../../utils/StringUtilities";
import { SortedSet } from "../../../entities/data-structures/SortedSet";
import { MarkdownContainer } from "../../theming/MarkdownContainer";
import { PageNavigation } from "../../articles/navigation/PageNavigation";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { BookChapterView2 } from "./BookChapterView2";
import { Book } from "../../../entities/library/books/Book";

export const BookView2 = () => {
    const location = useLocation();
    const params = useParams();
    const { books, allBooksLoaded } = useSelector((app: ApplicationState) => app.library);
    if (!allBooksLoaded) {
        return <Loader />
    }

    let name = params["name"] as string | undefined;
    if (name == undefined) {
        throw new Error("No adventure name provided.");
    }
    name = decodeNameFromURI(name);

    const set = new SortedSet(books);
    const book = set.getByName(name);
    if (book == undefined) {
        throw new Error("No adventure found.");
    }

    const root = new ArticleNavLink({
        path: `/Library/Books/${encodeNameForURI(name)}`,
        name: name
    });
    const links = book.chapters.map(c => new ArticleNavLink({
        path: encodeNameForURI(c.name),
        name: c.name
    }));
    return (
        <>
            <Breadcrumbs crumbs={[LibraryRootRoute, BooksRoute, {path: location.pathname, name}]} />
            <Routes>
                <Route path=":chapterName" element={<BookChapterView2 book={book} root={root} links={links} />} />
                <Route path="*" element={<BookPreview book={book} root={root} links={links} />} />
            </Routes>
        </>
    );
}

type Props = {
    book: Book;
    root: ArticleNavLink;
    links: ArticleNavLink[];
}
const BookPreview = (props: Props) => {
    const { book, root, links } = props;
    const { name, published, description } = book;
    const publishDate = new Date(published);
    return (
        <>
            <PageNavigation root={root} next={links[0]}>
                {name}
            </PageNavigation>
            <article>
                <h1>{name}</h1>
                <em>Published {publishDate.toDateString()}</em>
                <MarkdownContainer>{description}</MarkdownContainer>
            </article>
        </>
    )
}