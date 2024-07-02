import React from "react";
import { MarkdownContainer } from "../../theming/MarkdownContainer";
import { StoryNodesContainer } from "./StoryNodesContainer";
import { Chapter } from "../../../entities/library/books/Chapter";
import { Npc } from "../../../entities/library/books/NPC";

type Props = {
    chapters: Chapter[];
    chapter: Chapter;
    npcs: Npc[];
}

export const BookChapterView = (props: Props) => {
    const { chapter, chapters, npcs } = props;
    const index = chapters.indexOf(chapter) + 1;
    return (
        <section className="divided-section">
            <h1>Chapter {index}: {chapter.name}</h1>
            <MarkdownContainer>{chapter.text}</MarkdownContainer>
            <StoryNodesContainer nodes={chapter.nodes} npcs={npcs} />
        </section>
    );
}