import { Dispatch, SetStateAction } from "react";
import { Book } from "../../../entities/library/books/Book";
import { Chapter } from "../../../entities/library/books/Chapter";
import { Npc } from "../../../entities/library/books/NPC";
import { RecordStatus } from "../../../entities/RecordStatus";

export class BookStateSetter {
    public constructor(setState: Dispatch<SetStateAction<Book>>) {
        this.setState = setState;
    }

    protected readonly setState: Dispatch<SetStateAction<Book>>;

    public updateName(e: React.ChangeEvent<HTMLInputElement>): void {
        this.setState(state => ({ ...state, name: e.target.value }));
    }

    public updateDescription(e: React.ChangeEvent<HTMLTextAreaElement>): void {
        this.setState(state => ({ ...state, description: e.target.value }));
    }

    public updateChapters(chapters: Chapter[]): void {
        this.setState(state => ({ ...state, chapters: [...chapters] }));
    }

    public updateNPCs(npcs: Npc[]): void {
        this.setState(state => ({ ...state, npcs: [...npcs] }));
    }

    public updateItemIds(itemIds: string[]): void {
        this.setState(state => ({ ...state, itemIds }));
    }

    public updateMinionIds(minionIds: string[]): void {
        this.setState(state => ({ ...state, minionIds }));
    }

    public updatePerkIds(perkIds: string[]): void {
        this.setState(state => ({ ...state, perkIds }));
    }

    public updatepersonalityIds(personalityIds: string[]): void {
        this.setState(state => ({ ...state, personalityIds }));
    }

    public updateTags(tags: string[]): void {
        this.setState(state => ({ ...state, tags }));
    }

    public updateRecordStatus(recordStatus: RecordStatus): void {
        this.setState(state => ({ ...state, recordStatus }));
    }
}