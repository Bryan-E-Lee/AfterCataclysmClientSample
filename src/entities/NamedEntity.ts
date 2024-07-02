export type IdentifiableEntity = {
    id: string;
}

export type AssignedEntity = IdentifiableEntity & { 
    instanceId: string;
}

export type NamedEntity = IdentifiableEntity & {
    name: string;
}

export type AssignedNamedEntity = NamedEntity & AssignedEntity;

export const IsAssignedEntity = (entity: unknown): entity is AssignedEntity => {
    return (entity as AssignedEntity).instanceId != null;
}