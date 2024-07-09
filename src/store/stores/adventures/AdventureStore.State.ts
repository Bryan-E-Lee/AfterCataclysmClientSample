import { LocalAdventure } from "../../../entities/adventures/Adventure";

export type AdventureState = {
    adventures: LocalAdventure[];
    loaded: boolean;
    error: boolean;
}

export const AdventureDefaultState: AdventureState = {
    adventures: [],
    loaded: false,
    error: false,
}