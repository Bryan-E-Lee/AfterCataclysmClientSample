import { IndexableType } from "./IndexableType";

export interface HashMap<T> {
    [index: IndexableType]: T;
}