export interface ItemFilterState {
    name: string;
    description: string;
    minCost: number;
    maxCost: number;
    minWeight: number;
    maxWeight: number;
    tags: string[];
}

export const ItemFilterDefaultState: ItemFilterState = {
    name: '',
    description: '',
    minCost: 0,
    maxCost: 0,
    minWeight: 0,
    maxWeight: 0,
    tags: [],
};
