export interface AttributeCollectionInitializer {
    perception: number;
    endurance: number;
    tolerance: number;
    creativity: number;
}

export class AttributeCollection {
    public constructor(initializer: AttributeCollectionInitializer) {
        this.perception = initializer.perception;
        this.endurance = initializer.endurance;
        this.tolerance = initializer.tolerance;
        this.creativity = initializer.creativity;
    }

    public perception: number;
    public endurance: number;
    public tolerance: number;
    public creativity: number;
}
