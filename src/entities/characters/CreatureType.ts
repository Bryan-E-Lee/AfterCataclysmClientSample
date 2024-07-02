export type CreatureType = 'Humanoid'
                        | 'Robot'
                        | 'Aberration'
                        | 'Beast'
                        | 'Undead';

export const CreatureTypeCollection: CreatureType[] = [
    'Humanoid',
    'Robot',
    'Aberration',
    'Beast',
    'Undead'
]

export const CreatureTypeOptions = CreatureTypeCollection.map(ct => ({ name: ct, value: ct }));