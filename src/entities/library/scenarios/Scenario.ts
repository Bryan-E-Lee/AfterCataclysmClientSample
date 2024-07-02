import { getUniqueIdentifier } from "../../../utils/GUID";

export type Scenario = {
    id: string;
    name: string;
    contents: string;
    enemies: string[];
    tags: string[];
}

export const CreateDefaultScenario = (): Scenario => ({
    id: getUniqueIdentifier(),
    name: "",
    contents: "",
    enemies: [],
    tags: [],
})