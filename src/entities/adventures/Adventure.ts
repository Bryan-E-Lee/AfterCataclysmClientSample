import { DieFace } from "../rolls/Roll";
import { AdventureEvent } from "./AdventureEvent";

export type CommunalDice = [DieFace, DieFace];

export type Adventure = {
    id: string;
    ownerId: string;
    inviteId: string;
    name: string;
    description: string;
    publicNotes: string;
    privateNotes: string;
    active: boolean;
    allowsSharedContent: boolean;
    communalDice: CommunalDice;
    playerIds: string[];
    characterIds: string[];
    allowedBookIds: string[];
    events: AdventureEvent[];
}

export type LocalAdventure = Adventure & { rolling: boolean };