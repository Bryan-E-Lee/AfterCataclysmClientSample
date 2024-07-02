import { StoryNode } from "./StoryNode";

export type Chapter = {
    id: string;
    name: string;
    text: string;
    nodes: StoryNode[];
}