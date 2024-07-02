import { NamedEntity } from "../NamedEntity";

export type ObjectFilterInitializer = {
    name: string
}

export class ObjectFilter<T extends ObjectFilterInitializer> {
    public constructor(initializer: T) {
        this.name = initializer.name;
    }

    public name: string;

    public static GetDefaultInitializer(): ObjectFilterInitializer {
        return {
            name: ''
        };
    }

    public getInitializer(): ObjectFilterInitializer {
        return {
            name: this.name
        }
    }

    public static CreateFilterFromQuery<T extends ObjectFilterInitializer>(query: URLSearchParams): ObjectFilter<T> {
        const name = query.get('name') ?? '';
        return new ObjectFilter({ name });
    }

    public generateQueryString(): string {
        return `?${this.getQueryParams().join('&')}`;
    }

    public get initializer(): ObjectFilterInitializer {
        return { name: this.name };
    }

    protected filterBase<TE extends NamedEntity>(entities: TE[]): TE[] {
        let filteredEntities = [...entities];
        if (this.name != "") {
            filteredEntities = filteredEntities.filter(e => this.filterString(e.name, this.name));
        }
        return filteredEntities;
    }

    protected get nameQuery(): string | null {
        return this.name != '' ? `name=${this.name}` : null;
    }

    protected getQueryParams(): string[] {
        if (this.nameQuery) {
            return [this.nameQuery];
        }
        return [];
    }

    protected filterString = (value: string, check: string) => {
        return value.toLowerCase().includes(check.toLowerCase());
    };

    protected filterGreaterEqual = (value: number, check: number) => {
        return value >= check;
    };

    protected filterLessEqual = (itemValue: number, check: number) => {
        return itemValue <= check;
    };

    protected filterTagArray = (values: string[], check: string[]) => {
        return check.filter((tagName) => values.includes(tagName)).length > 0;
    };
}