import { Condition } from "../characters/Conditions";
import { ObjectFilter, ObjectFilterInitializer } from "./ObjectFilter";

export class ConditionFilter extends ObjectFilter<ObjectFilterInitializer> {
    public filter(conditions: Condition[]) {
        return super.filterBase(conditions);
    }
}