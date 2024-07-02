export interface Condition {
    id: string;
    name: string;
    description: string;
    beneficial: boolean;
}

export const DefaultCondition: Condition = {
    id: '',
    name: '',
    description: '',
    beneficial: false
}