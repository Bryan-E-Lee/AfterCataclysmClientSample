import { Adventure } from "../../../entities/adventures/Adventure";

export interface AdventureState {
    adventures: Adventure[];
    loaded: boolean;
}

export const AdventureDefaultState: AdventureState = {
    adventures: [],
    loaded: false,
}