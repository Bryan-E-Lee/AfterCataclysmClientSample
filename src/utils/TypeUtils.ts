export type Unarrayed<T> = T extends (infer U)[] ? U : never;

export function nonEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value != null && value != undefined;
}