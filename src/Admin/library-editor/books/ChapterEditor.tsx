import React from "react";
import { Chapter } from "../../../entities/library/books/Chapter"
import { CollapsibleRegion } from "../../../components/articles/CollapsibleRegion";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { CollapsibleSection } from "../../../components/articles/CollapsibleSection";
import { Npc } from "../../../entities/library/books/NPC";
import { getUniqueIdentifier } from "../../../utils/GUID"
import { NodesEditor } from "./NodesEditor";
import { MarkdownContainer } from "../../../components/theming/MarkdownContainer";

type MultiChapterProps = {
    chapters: Chapter[]
    npcs: Npc[];
    onUpdate: (chapters: Chapter[]) => unknown;
}

const createChapter = (): Chapter => ({
    id: getUniqueIdentifier(),
    name: "",
    text: "",
    nodes: []
})

export const ChaptersEditor = (props: MultiChapterProps) => {
    const { chapters, npcs, onUpdate } = props;
    const addChapter = () => {
        chapters.push(createChapter());
        onUpdate(chapters);
    }
    const shiftUp = (index: number) => {
        const chapter = chapters[index];
        chapters.splice(index, 1);
        chapters.splice(index - 1, 0, chapter);
        onUpdate(chapters);
    }
    const shiftDown = (index: number) => {
        const chapter = chapters[index];
        chapters.splice(index, 1);
        chapters.splice(index + 1, 0, chapter);
        onUpdate(chapters);
    }
    const createChapterUpdater = (index: number) => {
        return (chapter: Chapter) => {
            chapters.splice(index, 1, chapter);
            onUpdate(chapters);
        }
    }
    const onChapterDelete = (index: number) => {
        chapters.splice(index, 1);
        onUpdate(chapters);
    }
    return (
        <>
            <ThemedButton onClick={addChapter}>Add Chapter</ThemedButton>
            {chapters.map((c, i) => (
                <ChapterEditor key={c.id} 
                    chapter={c}
                    npcs={npcs}
                    shiftUp={() => shiftUp(i)}
                    shiftDown={() => shiftDown(i)}
                    onUpdate={createChapterUpdater(i)}
                    onDelete={() => onChapterDelete(i)} />
            ))}
            <ThemedButton onClick={addChapter}>Add Chapter</ThemedButton>
        </>
    )
}

type ChapterProps = {
    chapter: Chapter;
    npcs: Npc[];
    shiftUp: () => unknown;
    shiftDown: () => unknown;
    onUpdate: (chapter: Chapter) => unknown;
    onDelete: () => unknown;
}

const ChapterEditor = (props: ChapterProps) => {
    const { chapter, npcs, shiftUp, shiftDown, onUpdate, onDelete } = props;
    return (
        <CollapsibleRegion header={chapter.name}>
            <ThemedButton onClick={() => onDelete()}>
                Delete
            </ThemedButton>
            <div className="form-field">
                <ThemedButton onClick={() => shiftUp()}>Shift Up</ThemedButton>
                <ThemedButton onClick={() => shiftDown()}>Shift Down</ThemedButton>
            </div>
            <div className="form-field">
                <label>Name</label>
                <input type="text" value={chapter.name} onChange={e => onUpdate({ ...chapter, name: e.target.value })} />
            </div>
            <div className="form-field">
                <NodesEditor nodes={chapter.nodes} npcs={npcs} onUpdate={nodes => onUpdate({ ...chapter, nodes })} />
            </div>
            <div className="form-field">
                <CollapsibleRegion header="Contents">
                    <textarea value={chapter.text} onChange={e => onUpdate({ ...chapter, text: e.target.value })} />
                    <CollapsibleSection header="Preview" expandedInitially>
                        <MarkdownContainer>{chapter.text}</MarkdownContainer>
                    </CollapsibleSection>
                </CollapsibleRegion>
            </div>
            <ThemedButton onClick={() => onDelete()}>
                Delete
            </ThemedButton>
        </CollapsibleRegion>
    )
}