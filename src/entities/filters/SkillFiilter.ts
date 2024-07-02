import { SkillInitializer } from "../library/skills/Skill";
import { ObjectFilter, ObjectFilterInitializer } from "./ObjectFilter";

export class SkillFilter extends ObjectFilter<ObjectFilterInitializer> implements ObjectFilterInitializer {
    public constructor(initializer: ObjectFilterInitializer) {
        super(initializer);
    }

    public static GetDefaultInitializer(): ObjectFilterInitializer {
        return {
            name: ''
        };
    }

    public getInitializer(): ObjectFilterInitializer {
        return {
            name: this.name
        };
    }

    public static CreateFilterFromQuery(query: URLSearchParams): SkillFilter {
        const name = query.get('name') ?? '';
        return new SkillFilter({ name });
    }

    public filterSkills(skills: SkillInitializer[]): SkillInitializer[] {
        let filteredSkills = [...skills];
        if (this.name != '') {
            filteredSkills = filteredSkills.filter(s => this.filterString(s.name, this.name));
        }
        return filteredSkills;
    }
}