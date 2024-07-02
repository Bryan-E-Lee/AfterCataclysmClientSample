import { getUniqueIdentifier } from "../../../utils/GUID";
import { RecordStatus } from "../../RecordStatus";
import { Chapter } from "./Chapter";
import { Npc } from "./NPC";

export type Book = {
    id: string;
    name: string;
    description: string;
    published: string;
    chapters: Chapter[];
    npcs: Npc[];
    itemIds: string[];
    minionIds: string[];
    perkIds: string[];
    personalityIds: string[];
    tags: string[];
    recordStatus: RecordStatus;
}

export const DefaultBook: Book = Object.freeze({
    id: getUniqueIdentifier(),
    name: '',
    description: '',
    published: new Date().toISOString(),
    chapters: [],
    npcs: [],
    itemIds: [],
    minionIds: [],
    perkIds: [],
    personalityIds: [],
    tags: [],
    recordStatus: RecordStatus.Published,
})