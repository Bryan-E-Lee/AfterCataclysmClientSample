export function getPluralityCharacter(value: number): string {
    return value == 1
        ? ''
        : 's'
}

export function encodeNameForURI(name: string): string {
    return encodeURI(name.split(" ").join("+"));
}

export function decodeNameFromURI(name: string): string {
    name = name.split("_").join("+");
    return decodeURI(name.split("+").join(" "));
}