interface Array<T> {
    contains<T>(this: T[], entity: T): boolean;
    any<T>(this: T[], predicate?: (entity: T) => boolean): boolean;
    intersection<T>(this: T[], other: T[]): T[];
    mapMany<T, TOut>(this: T[], propertyGetter: (entity: T) => TOut[]): TOut[];
    unique<T>(this: T[], distinguisher?: (entity: T) => string): T[];
    sum<T>(this: T[], predicate: (entity: T) => SummableType): number;
    count<T>(this: T[], predicate: (entity: T) => boolean): number;
    first<T>(this: T[], predicate?: (entity: T) => boolean): T | null;
    search<T>(this: T[], entity: T, keyGenerator: (entity: T) => number): number;
    insertAsSorted<T>(this: T[], entity: T, keyGenerator: (entity: T) => number): void;
    max<T>(this: T[], predicate: (entity: T) => number): number;
    min<T>(this: T[], predicate: (entity: T) => number): number;
}

Array.prototype.contains = contains;
Array.prototype.any = any;
Array.prototype.intersection = intersection;
Array.prototype.mapMany = mapMany;
Array.prototype.unique = unique;
Array.prototype.sum = sum;
Array.prototype.count = count;
Array.prototype.first = first;
Array.prototype.search = search;
Array.prototype.insertAsSorted = insertAsSorted;
Array.prototype.max = max;
Array.prototype.min = min;

function contains<T>(this: T[], entity: T): boolean {
    return this.indexOf(entity) >= 0;
};

function any<T>(this: T[], predicate?: (entity: T) => boolean): boolean {
    if (predicate == null) {
        return this.length > 0;
    }
    return this.some(predicate);
};

function intersection<T>(this: T[], other: T[]): T[] {
    return this.filter(entity => other.indexOf(entity) >= 0);
}

function mapMany<T, TOut>(this: T[], propertyGetter: (entity: T) => TOut[]): TOut[] {
    return this.reduce((accum: TOut[], curr: T) => [...accum, ...propertyGetter(curr)], []);
}

/**
 * Generates an array of unique elements.
 * @param this The array to generate unique elements from.
 * @param distinguisher A function which takes an element of the array and returns a unique key to represent that element.
 * @returns An array of unique elements.
 */
function unique<T>(this: T[], distinguisher?: (entity: T) => string): T[] {
    const array: T[] = [];
    if (distinguisher == null) {
        const set = new Set(this);
        for (let value of set.values()) {
            array.push(value);
        }
    }
    else {
        const entities = new Map();
        for (let value of this) {
            const key = distinguisher(value);
            if (entities.get(key)) {
                continue;
            }
            entities.set(key, value);
            array.push(value);
        }
    }
    return array;
}

type SummableType = number | null | undefined;
function sum<T>(this: T[], predicate: (entity: T) => SummableType): number {
    return this.map<SummableType>(predicate)
        .reduce((accum: number, curr: SummableType) => accum + (curr || 0), 0);
}

function count<T>(this: T[], predicate: (entity: T) => boolean): number {
    return this.filter(predicate).length;
}

function first<T>(this: T[], predicate?: (entity: T) => boolean): T | null {
    if (predicate == null) {
        return this[0];
    }

    for (let entity of this) {
        if (predicate(entity)) {
            return entity;
        }
    }
    return null;
}

function search<T>(this: T[], entity: T, keyGenerator: (entity: T) => number): number {
    const entityKey = keyGenerator(entity);
    let minIndex = 0;
    let maxIndex = this.length - 1;
    let pivot: number;
    let checkKey: number;

    while (minIndex <= maxIndex) {
        pivot = Math.floor((minIndex + maxIndex) * 0.5);
        checkKey = keyGenerator(this[pivot]);

        if (checkKey < entityKey) {
            minIndex = pivot + 1;
        }
        else if (checkKey > entityKey) {
            maxIndex = pivot - 1;
        }
        else {
            return pivot;
        }
    }
    return ~minIndex;
}

function insertAsSorted<T>(this: T[], entity: T, keyGenerator: (entity: T) => number): void {
    let index = this.search(entity, keyGenerator);
    if (index < 0) {
        index = ~index;
    }
    this.splice(index, 0, entity);
}

function max<T>(this: T[], predicate: (entity: T) => number): number {
    if (this.length == 0) {
        return 0;
    }
    let largestSeen = predicate(this[0]);
    for (let item of this) {
        largestSeen = Math.max(predicate(item), largestSeen);
    }
    return largestSeen;
}

function min<T>(this: T[], predicate: (entity: T) => number): number {
    if (this.length == 0) {
        return 0;
    }

    let smallestSeen = predicate(this[0]);
    for (let item of this) {
        smallestSeen = Math.min(predicate(item), smallestSeen);
    }
    return smallestSeen;
}