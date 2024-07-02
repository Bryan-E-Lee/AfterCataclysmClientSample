export const Tag = Object.seal({
    AmmoTags: [
        'Blade',
        'Bludgeon',
        'Spike',
        'Bullet',
        'Cell',
        'Shot',
        'Cannister',
        'Payload',
        'Rocket'
    ],
    IsAmmoTag: (tag: string) => Tag.AmmoTags.includes(tag),
    Sort: (tag1: string, tag2: string) => tag1.localeCompare(tag2),
    MapToSelectableOption: (tag: string) => ({ name: tag, value: tag })
});