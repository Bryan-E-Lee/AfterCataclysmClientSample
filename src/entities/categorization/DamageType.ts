export type DamageType = 'Percussive'
    | 'Explosive'
    | 'Thermal'
    | 'Cryo'
    | 'Electromagnetic'
    | 'Corrosive'
    | 'Biological'
    | 'Hacking';



export const AllDamageTypes: DamageType[] = [
    'Percussive',
    'Explosive',
    'Thermal',
    'Cryo',
    'Electromagnetic',
    'Corrosive',
    'Biological',
    'Hacking'
];

export const DamageTypeSort = (d1: DamageType, d2: DamageType) => AllDamageTypes.indexOf(d1) - AllDamageTypes.indexOf(d2);