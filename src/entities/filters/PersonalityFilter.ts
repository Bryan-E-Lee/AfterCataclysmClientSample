import { PersonalityInitializer } from "../library/socials/Personality";
import { ObjectFilter, ObjectFilterInitializer } from "./ObjectFilter";

export class PersonalityFilter extends ObjectFilter<ObjectFilterInitializer> {
    public filter(conditions: PersonalityInitializer[]) {
        return super.filterBase(conditions);
    }
}