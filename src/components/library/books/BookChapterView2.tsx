import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { useParams } from "react-router";
import { decodeNameFromURI } from "../../../utils/StringUtilities";
import { MarkdownContainer } from "../../theming/MarkdownContainer";
import { Book } from "../../../entities/library/books/Book";
import { PageNavigation } from "../../articles/navigation/PageNavigation";
import { StoryNodesContainer } from "./StoryNodesContainer";

type Props = {
    book: Book;
    root: ArticleNavLink;
    links: ArticleNavLink[];
}

export const BookChapterView2 = (props: Props) => {
    const { book, root, links } = props;
    const params = useParams();

    let chapterName = params["chapterName"] as string | undefined;
    if (chapterName == undefined) {
        throw new Error("No chapter name provided.");
    }
    chapterName = decodeNameFromURI(chapterName);

    const chapter = book.chapters.find(c => c.name == chapterName);
    if (chapter == undefined) {
        throw new Error("No chapter found.");
    }

    const chapterIndex = links.findIndex(l => l.name == chapterName);
    const next = links[chapterIndex + 1];
    const prev = links[chapterIndex - 1] ?? root;
    return (
        <>
            <PageNavigation root={root} prev={prev} next={next}>
                {chapterName}
            </PageNavigation>
            <article className="book-chapter">
                <h1>{chapter.name}</h1>
                <MarkdownContainer>{chapter.text}</MarkdownContainer>
                <StoryNodesContainer nodes={chapter.nodes} npcs={book.npcs} />
            </article>
        </>
    );
}