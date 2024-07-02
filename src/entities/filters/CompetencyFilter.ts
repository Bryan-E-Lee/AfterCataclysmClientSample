import {  CompetencyCategoriesByName, CompetencyCategory, CompetencyCategoryNames, CompetencyInitializer } from "../characters/Competencies";
import { ObjectFilter, ObjectFilterInitializer } from "./ObjectFilter";

type CategoryFilter = CompetencyCategory | null;

export type CompetencyFilterInitializer = ObjectFilterInitializer & {
    category: CompetencyCategory | null
}

export class CompetencyFilter extends ObjectFilter<CompetencyFilterInitializer> implements ObjectFilterInitializer {
    public constructor(initializer: CompetencyFilterInitializer) {
        super(initializer);
        this.category = initializer.category;
    }

    public category: CategoryFilter;

    public static CreateFilterFromQuery(query: URLSearchParams): CompetencyFilter {
        const name = query.get("name") ?? "";
        let category: CategoryFilter = null;
        const categoryQuery = query.get("category");
        if (categoryQuery) {
            category = CompetencyCategoriesByName[categoryQuery];
        }
        return new CompetencyFilter({ name, category });
    }

    public static GetDefaultInitializer(): CompetencyFilterInitializer {
        return {
            ...ObjectFilter.GetDefaultInitializer(),
            category: null
        }
    }

    protected get categoryQuery(): string | null {
        return this.category == undefined ? null : `category=${CompetencyCategoryNames[this.category]}`;
    }

    protected getQueryParams(): string[] {
        const params = super.getQueryParams();
        if (this.categoryQuery) {
            return [...params, this.categoryQuery];
        }
        return params;
    }

    public get initializer(): CompetencyFilterInitializer {
        return { ...super.initializer, category: this.category };
    }

    public filter<T extends CompetencyInitializer>(competencies: T[]): T[] {
        let filteredCompetencies = super.filterBase(competencies);
        if (this.category != null) {
            filteredCompetencies = filteredCompetencies.filter(c => c.category == this.category);
        }
        return filteredCompetencies;
    }
}