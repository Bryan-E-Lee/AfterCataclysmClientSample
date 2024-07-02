import { TextModifier } from '../../../character-modifiers/TextModifier';
import { ValueModifier } from '../../../character-modifiers/ValueModifier';
import { SortedSet } from '../../../data-structures/SortedSet';
import { InstanceIdKeyGetter } from '../../../Ownership';
import { Item } from '../Item';
import { ItemFactory } from '../ItemFactory';
import { OwnedContainerInitializer, OwnedItemInitializer } from '../ItemInitializers';

export function isContainer(item: Item): item is Container {
    return item.type == 'Container';
}

export class Container extends Item implements OwnedContainerInitializer {
    public constructor(initializer: OwnedContainerInitializer) {
        super(initializer);
        const contents = initializer.items.map(ItemFactory.Create);
        this.contents = new SortedSet(contents, InstanceIdKeyGetter);
        this.allowedTags = initializer.allowedTags;
    }

    public readonly type: 'Container' = 'Container';
    public readonly allowedTags: string[];
    public readonly contents: SortedSet<Item>;
    public valueModifiers: ValueModifier[] = [];
    public textModifiers: TextModifier[] = [];
    
    public get containedItems(): Item[] {
        return super.containedItems.concat(this.contents.collection);
    }

    public get items(): OwnedItemInitializer[] {
        return this.contents.collection;
    }

    public get totalWeight(): number {
        return this.weight + this.contents.collection.sum(i => i.weight);
    }

    public get initializer(): OwnedContainerInitializer {
        return {
            ...this,
            ...super.initializer,
            items: this.contents.collection.map(item => item.initializer),
        }
    }

    public findItem(instanceId: string): Item | undefined {
        return super.findItem(instanceId)
            ?? this.contents.get(instanceId)
            ?? this.findInNestedItems(instanceId);
    }

    private findInNestedItems(instanceId: string): Item | undefined {
        let found: Item | undefined;
        for (let item of this.contents.collection) {
            found = item.findItem(instanceId);
            if (found != undefined) {
                break;
            }
        }
        return found;
    }

    public removeInstance(instanceId: string): Item | undefined {
        return super.removeInstance(instanceId)
            ?? this.contents.removeByKey(instanceId)
            ?? this.removeFromNestedItems(instanceId);
    }

    public removeInstances(...instanceIds: string[]): Item[] {
        const items: Item[] = [];
        for (const instanceId of instanceIds) {
            const removed = this.removeInstance(instanceId);
            if (removed != undefined) {
                items.push(removed);
            }
        }
        return items;
    }

    private removeFromNestedItems(instanceId: string): Item | undefined {
        let removed: Item | undefined;
        for (let item of this.contents.collection) {
            removed = item.removeInstance(instanceId);
            if (removed != undefined) {
                break;
            }
        }
        return removed;
    }
}