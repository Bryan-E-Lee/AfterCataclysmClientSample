
import { Hazard } from "../library/hazards/Hazard";
import { ObjectFilter, ObjectFilterInitializer } from "./ObjectFilter";

export class HazardFilter extends ObjectFilter<ObjectFilterInitializer> {
    public filter(hazards: Hazard[]) {
        return super.filterBase(hazards);
    }
}