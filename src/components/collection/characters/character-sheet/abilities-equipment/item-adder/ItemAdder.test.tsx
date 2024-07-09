// import { render, screen } from '@testing-library/react';
// import renderer from 'react-test-renderer';
// import 'jest';
// import React from 'react';
// import { ItemAdder } from '.';
// import { Character } from '../../../../../../entities/characters/Character';
// import { SheetDefaultState } from '../../../../../../store/stores/characters/sheet/CharacterSheet.State';
// import { SortedSet } from '../../../../../../entities/data-structures/SortedSet';
// import { ItemInitializer } from '../../../../../../entities/library/items/ItemInitializers';
// import { RhetoricInitializer } from '../../../../../../entities/library/socials/Rhetoric';
// import { MinionInitializer } from '../../../../../../entities/library/minions/Minion';
// import { PerkInitializer } from '../../../../../../entities/library/perks/Perk';
// import { SkillInitializer } from '../../../../../../entities/library/skills/Skill';
// import { PersonalityInitializer } from '../../../../../../entities/library/socials/Personality';

// const createDefaultCharacter = (): Character => {
//     return new Character(SheetDefaultState, {
//         items: new SortedSet<ItemInitializer>(),
//         minions: new SortedSet<MinionInitializer>(),
//         perks: new SortedSet<PerkInitializer>(),
//         personalities: new SortedSet<PersonalityInitializer>(),
//         rhetorics: new SortedSet<RhetoricInitializer>(),
//         skills: new SortedSet<SkillInitializer>(),
//     });
// }

// describe('item adder', () => {
//     describe('render', () => {
//         test('default state snapshot', () => {
//             const adder = <ItemAdder character={createDefaultCharacter()} close={() => {}} />;
//             const component = renderer.create(adder);

//             const tree = component.toJSON();

//             expect(tree).toMatchSnapshot();
//         })

//         test('add to container state snapshot', () => {
//             const adder = <ItemAdder character={createDefaultCharacter()} close={() => {}} />;
//             const component = renderer.create(adder);

//             const tree = component.toJSON();

//             expect(tree).toMatchSnapshot();
//         })
//     })
// })