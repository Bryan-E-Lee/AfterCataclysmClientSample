import { PerkInitializer } from "../library/perks/Perk";
import { ObjectFilter, ObjectFilterInitializer } from "./ObjectFilter";

export interface PerkFilterInitializer extends ObjectFilterInitializer {
    tags: string[];
}

export class PerkFilter extends ObjectFilter<PerkFilterInitializer> implements PerkFilterInitializer {
    public constructor(initializer: PerkFilterInitializer) {
        super(initializer);
        this.tags = initializer.tags;
    }

    public tags: string[];

    public static GetDefaultInitializer(): PerkFilterInitializer {
        return {
            name: '',
            tags: []
        };
    }

    public getInitializer(): PerkFilterInitializer {
        return {
            name: this.name,
            tags: this.tags
        };
    }

    public static CreateFilterFromQuery(query: URLSearchParams): PerkFilter {
        const name = query.get('name') ?? '';
        const tags = query.get('tags')?.split(',') ?? [];

        return new PerkFilter({ name, tags });
    }

    protected get tagsQuery(): string | null {
        return this.tags.length > 0 ? `tags=${this.tags.join(',')}` : null;
    }

    protected getQueryParams(): string[] {
        const queryParams = super.getQueryParams();
        if (this.tagsQuery) {
            queryParams.push(this.tagsQuery);
        }
        return queryParams;
    }

    public filterPerks(perks: PerkInitializer[]): PerkInitializer[] {
        let filteredPerks = [...perks];
        if (this.name != '') {
            filteredPerks = filteredPerks.filter(p => this.filterString(p.name, this.name));
        }
        if (this.tags.length > 0) {
            filteredPerks = filteredPerks.filter(p => this.filterTagArray(p.tags, this.tags));
        }
        return filteredPerks;
    }
}