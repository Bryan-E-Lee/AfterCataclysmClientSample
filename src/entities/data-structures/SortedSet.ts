import { NamedEntity } from "../NamedEntity";
import { IndexableType } from "./IndexableType";

export class SortedSet<T extends NamedEntity> implements Iterable<T> {
    public constructor(entities: T[] = [], keyGetter?: ((entity: T) => IndexableType)) {
        this.keyGetter = keyGetter || this.defaultKeyGetter;
        this.collection = [...entities].sort(this.keySort.bind(this));
        this.hashmap = this.collection.reduce((accum: Map<IndexableType, T>, curr: T) => {
            const index = this.keyGetter(curr);
            accum.set(index, curr);
            return accum;
        }, new Map<IndexableType, T>());
    }

    public static Copy<T extends NamedEntity>(other: SortedSet<T>): SortedSet<T> {
        return new SortedSet(other.collection, other.keyGetter);
    }

    private defaultKeyGetter = (entity: T): IndexableType => {
        return entity.id;
    }

    public readonly collection: T[];
    private readonly keyGetter: (entity: T) => IndexableType;
    private readonly hashmap: Map<IndexableType, T>;

    [Symbol.iterator]() {
        return this.collection[Symbol.iterator]();
    }

    public get count(): number {
        return this.collection.length;
    }

    public get any(): boolean {
        return this.count > 0;
    }

    private keySort(one: T, two: T): number {
        if (one.name > two.name) {
            return 1;
        }
        else if (one.name < two.name) {
            return -1;
        }
        return 0;
    }

    private search(name: string): number {
        let minIndex = 0;
        let maxIndex = this.collection.length - 1;
        let pivot: number;
        let check: T;

        while (minIndex <= maxIndex) {
            pivot = Math.floor((minIndex + maxIndex) * 0.5);
            check = this.collection[pivot];
            if(check.name < name) {
                minIndex = pivot + 1;
            }
            else if (check.name > name) {
                maxIndex = pivot - 1;
            }
            else {
                return pivot;
            }
        }
        return ~minIndex;
    }

    public containsKey(key: IndexableType): boolean {
        return this.hashmap.get(key) != undefined;
    }

    public contains(entity: T): boolean {
        const key = this.keyGetter(entity);
        return this.containsKey(key);
    }

    public removeByKey(key: IndexableType): T | undefined {
        const element = this.hashmap.get(key);
        if (element == null) {
            return;
        }
        this.hashmap.delete(key);
        let index = this.search(element.name);
        if (index > -1) {
            const check = this.collection[index];
            const checkKey = this.keyGetter(check);
            while (checkKey != this.keyGetter(element) && check.name == element.name) {
                index++;
            }
            this.collection.splice(index, 1);
        }
        return element;
    }

    public removeByKeys(...keys: IndexableType[]): T[] {
        const removed: T[] = [];
        for (const key of keys) {
            const result = this.removeByKey(key);
            if (result != undefined) {
                removed.push(result);
            }
        }
        return removed;
    }

    public remove(entity: T): T | undefined {
        const key = this.keyGetter(entity);
        return this.removeByKey(key);
    }

    public add(entity: T): boolean {
        const key = this.keyGetter(entity);
        if (this.containsKey(key)) {
            return false;
        }

        let index = this.search(entity.name);
        const spliceStart = index < 0 ? ~index : (index + 1);
        this.collection.splice(spliceStart, 0, entity);
        this.hashmap.set(key, entity);
        return true;
    }

    public addRange(...entities: T[]): void {
        for (const entity of entities) {
            if (entity != null) {
                this.add(entity);
            }
        }
    }

    public get<S extends T>(id: string | null | undefined, isT?: (x: any) => x is S): S | undefined {
        if (id == null) {
            return undefined;
        }
        
        const match = this.hashmap.get(id);
        if (isT != null && isT(match)) {
            return match;
        }
        if (isT != null && !isT(match)) {
            return undefined;
        }
        return <S>match;
    }

    public getByName(name: string): T | undefined {
        const index = this.search(name);
        return this.collection[index];
    }

    public update(entity: T): void {
        const index = this.search(entity.name);
        this.collection[index] = entity;

        const key = this.keyGetter(entity);
        this.hashmap.set(key, entity);
    }

    public updateByKey(entity: T): void {
        const key = this.keyGetter(entity);
        this.removeByKey(key);
        this.add(entity);
    }

    public addOrUpdate(entity: T): void {
        if (this.contains(entity)) {
            this.update(entity);
        }
        else {
            this.add(entity);
        }
    }

    public addOrUpdateRange(...entities: T[]): void {
        for (const entity of entities) {
            this.addOrUpdate(entity);
        }
    }
}