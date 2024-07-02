export type Hazard = {
    id: string;
    name: string;
    description: string;
    rough: boolean;
    solutions: string[];
    tags: string[];
}

export const DefaultHazard: Hazard = {
    id: "",
    name: "",
    description: "",
    rough: false,
    solutions: [],
    tags: [] 
}