import { AdventureEvent } from "./AdventureEvent";

export interface Adventure {
    id: string;
    ownerId: string;
    inviteId: string;
    name: string;
    description: string;
    publicNotes: string;
    privateNotes: string;
    active: boolean;
    allowsSharedContent: boolean;
    playerIds: string[];
    characterIds: string[];
    allowedBookIds: string[];
    events: AdventureEvent[];
}