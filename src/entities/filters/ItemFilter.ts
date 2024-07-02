import { RecordStatus } from "../RecordStatus";
import { ItemCategoryValue, ItemInitializer } from "../library/items/ItemInitializers";
import { IsItemTypeValue } from "../library/items/ItemTypeMap";
import { ObjectFilter, ObjectFilterInitializer } from "./ObjectFilter";

export interface ItemFilterInitializer extends ObjectFilterInitializer {
    types: ItemCategoryValue[];
    description: string;
    minCost: number;
    maxCost: number;
    minWeight: number;
    maxWeight: number;
    tags: string[];
}

export class ItemFilter extends ObjectFilter<ItemFilterInitializer> implements ItemFilterInitializer {
    public constructor(initializer: ItemFilterInitializer) {
        super(initializer);
        this.types = initializer.types;
        this.description = initializer.description;
        this.minCost = initializer.minCost;
        this.maxCost = initializer.maxCost;
        this.minWeight = initializer.minWeight;
        this.maxWeight = initializer.maxWeight;
        this.tags = initializer.tags;
    }

    public types: ItemCategoryValue[];
    public description: string;
    public minCost: number;
    public maxCost: number;
    public minWeight: number;
    public maxWeight: number;
    public tags: string[];

    public static GetDefaultInitializer(): ItemFilterInitializer {
        return {
            types: [],
            name: '',
            description: '',
            minCost: 0,
            maxCost: 0,
            minWeight: 0,
            maxWeight: 0,
            tags: []
        };
    }

    public getInitializer(): ItemFilterInitializer {
        return {
            ...super.getInitializer(),
            types: this.types,
            description: this.description,
            minCost: this.minCost,
            maxCost: this.maxCost,
            minWeight: this.minWeight,
            maxWeight: this.maxWeight,
            tags: this.tags
        };
    }

    public static CreateFilterFromQuery(query: URLSearchParams): ItemFilter {
        const types = ItemFilter.GetTypesFromQuery(query);
        const name = query.get('name') ?? '';
        const description = query.get('description') ?? '';

        const minCost = parseInt(query.get('minCost') ?? '0');
        const maxCost = parseInt(query.get('maxCost') ?? '0');

        const minWeight = parseInt(query.get('minWeight') ?? '0');
        const maxWeight = parseInt(query.get('maxWeight') ?? '0');

        const tags = query.get('tags')?.split(',') ?? [];

        return new ItemFilter({
            types,
            name,
            description,
            minCost,
            maxCost,
            minWeight,
            maxWeight,
            tags
        });
    }

    private static GetTypesFromQuery(query: URLSearchParams): ItemCategoryValue[] {
        const typesString = query.get('types');
        if (typesString == null) {
            return [];
        }
        return typesString.split(',').filter<ItemCategoryValue>(IsItemTypeValue);
    }

    protected get typesQuery(): string | null {
        return this.types.any() ? `types=${this.types.join(',')}` : null;
    }

    protected get descriptionQuery(): string | null {
        return this.description != ''
            ? `description=${this.description}`
            : null;
    }

    protected get minCostQuery(): string | null {
        return this.minCost > 0 ? `minCost=${this.minCost}` : null;
    }

    protected get maxCostQuery(): string | null {
        return this.maxCost > 0 ? `maxCost=${this.maxCost}` : null;
    }

    protected get minWeightQuery(): string | null {
        return this.minWeight > 0 ? `minWeight=${this.minWeight}` : null;
    }

    protected get maxWeightQuery(): string | null {
        return this.maxWeight > 0 ? `maxWeight=${this.maxWeight}` : null;
    }

    protected get tagsQuery(): string | null {
        return this.tags.length > 0 ? `tags=${this.tags.join(',')}` : null;
    }

    protected getQueryParams(): string[] {
        const queryParams = super.getQueryParams();
        if (this.typesQuery) {
        queryParams.push(this.typesQuery);
        }
        if (this.descriptionQuery) {
            queryParams.push(this.descriptionQuery);
        }
        if (this.minCostQuery) {
            queryParams.push(this.minCostQuery);
        }
        if (this.maxCostQuery) {
            queryParams.push(this.maxCostQuery);
        }
        if (this.minWeightQuery) {
            queryParams.push(this.minWeightQuery);
        }
        if (this.maxWeightQuery) {
            queryParams.push(this.maxWeightQuery);
        }
        if (this.tagsQuery) {
            queryParams.push(this.tagsQuery);
        }
        return queryParams;
    }

    public filter(items: ItemInitializer[]): ItemInitializer[] {
        let filteredItems = super.filterBase(items)
            .filter(item => item.recordStatus == RecordStatus.Published);
        if (this.types.any()) {
            filteredItems = filteredItems.filter(this.filterType.bind(this));
        }
        if (this.description != null) {
            filteredItems = filteredItems.filter((item) =>
                this.filterString(item.description, this.description)
            );
        }
        if (this.minCost <= this.maxCost || this.maxCost == 0) {
            filteredItems = filteredItems.filter((item) =>
                this.filterGreaterEqual(item.cost, this.minCost)
            );
        }
        if (this.maxCost > 0) {
            filteredItems = filteredItems.filter((item) =>
                this.filterLessEqual(item.cost, this.maxCost)
            );
        }
        if (this.minWeight <= this.maxWeight || this.maxWeight == 0) {
            filteredItems = filteredItems.filter((item) =>
                this.filterGreaterEqual(item.weight, this.minWeight)
            );
        }
        if (this.maxWeight > 0) {
            filteredItems = filteredItems.filter((item) =>
                this.filterLessEqual(item.weight, this.maxWeight)
            );
        }
        if (this.tags.length > 0) {
            filteredItems = filteredItems.filter((item) =>
                this.filterTagArray(item.tags, this.tags)
            );
        }
        return filteredItems;
    }

    private filterType(item: ItemInitializer): boolean {
        let passesApparelFilter = false;
        if (this.types.contains('Apparel')) {
            passesApparelFilter = item.wornOn.any();
        }
        return passesApparelFilter || this.types.contains(item.type);
    }
}
