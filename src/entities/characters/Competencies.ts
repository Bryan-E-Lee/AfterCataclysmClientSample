import { SelectableOption } from "../../components/inputs/selects/SelectableOption";
import { OwnedCompetencyReference } from "../Ownership";

export enum CompetencyCategory {
    Exploration = 1,
    Social = 2,
    Knowledge = 3,
    Technical = 4,
    Other = 5
}

export const AllCompetencyCategories: CompetencyCategory[] = [
    CompetencyCategory.Exploration,
    CompetencyCategory.Social,
    CompetencyCategory.Knowledge,
    CompetencyCategory.Technical,
    CompetencyCategory.Other
]

export const CompetencyCategoryNames: Record<CompetencyCategory, string> = {
    [CompetencyCategory.Exploration]: "Exploration",
    [CompetencyCategory.Social]: "Social",
    [CompetencyCategory.Knowledge]: "Knowledge",
    [CompetencyCategory.Technical]: "Technical",
    [CompetencyCategory.Other]: "Other"
}

export const CompetencyCategoriesByName: Record<string, CompetencyCategory> = {
    ["Exploration"]: CompetencyCategory.Exploration,
    ["Social"]: CompetencyCategory.Social,
    ["Knowledge"]: CompetencyCategory.Knowledge,
    ["Technical"]: CompetencyCategory.Technical,
    ["Other"]: CompetencyCategory.Other
}

export const CompetencyCategoryOptions: SelectableOption<CompetencyCategory>[] = AllCompetencyCategories.map(cc => ({
    value: cc,
    name: CompetencyCategoryNames[cc]
}))

export type CompetencyInitializer = {
    id: string;
    name: string;
    description: string;
    category: CompetencyCategory;
}

export const DefaultCompetencyInitializer: CompetencyInitializer = {
    id: '',
    name: '',
    description: '',
    category: CompetencyCategory.Exploration
}

export type Competency = CompetencyInitializer & OwnedCompetencyReference;

export const DefaultCompetency: Competency = {
    ...DefaultCompetencyInitializer,
    isExpert: false,
    saved: false
}