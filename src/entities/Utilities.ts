export type Comparator = ">" | "<" | ">=" | "<=" | "==" | "!=";

export type SnakeToCamel<T extends string> = T extends `${infer ONE}_${infer TWO}`
    ? `${ONE}${Capitalize<SnakeToCamel<TWO>>}`
    : Lowercase<T>;

export type CamelToSnake<T extends string> = T extends `${infer ONE}${infer TWO}`
    ? `${ONE extends Uppercase<ONE> ? `_${Lowercase<ONE>}` : Lowercase<ONE>}${CamelToSnake<TWO>}`
    : Lowercase<T>;

export type PascalToCamel<T extends string> = T extends `${infer ONE}${infer TWO}`
    ? `${Lowercase<ONE>}${TWO}`
    : Lowercase<T>;

export type CamelToPascal<T extends string> = T extends `${infer ONE}${infer TWO}`
    ? `${Capitalize<ONE>}${TWO}`
    : Capitalize<T>;

export type PascalToSnake<T extends string> = CamelToSnake<PascalToCamel<T>>;
export type SnakeToPascal<T extends string> = CamelToPascal<SnakeToCamel<T>>;

export function isComparator(test: string): test is Comparator {
    return test == ">"
        || test == "<"
        || test == ">="
        || test == "<="
        || test == "=="
        || test == "!=";
}

export const RestrictNumber = (value: number, min: number, max: number) => {
    const boundedByUpper = Math.min(value, max);
    return Math.max(min, boundedByUpper);
}