export type PatchableProperty<T> = {
    [Property in keyof T]: T[Property] extends (string | number | boolean | null | undefined) ? Property : never;
}[keyof T]