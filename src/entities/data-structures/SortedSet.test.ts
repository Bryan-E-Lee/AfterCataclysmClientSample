import 'jest';
import { NamedEntity } from '../NamedEntity';
import { SortedSet } from './SortedSet';

interface TestIdentifiable extends NamedEntity {
    name: string;
}

interface TestIdentifiableExtended extends TestIdentifiable {
    roshambo: any
}

const nameKeyGetter = (ti: TestIdentifiable) => ti.name;

function isTestIdentifiableExtended(identifiable: TestIdentifiable): identifiable is TestIdentifiableExtended {
    return (<any>identifiable).roshambo != undefined;
}

const testIdentifiables: TestIdentifiable[] = Array.from(Array(100).keys())
    .map(number => ({
        id: number.toString(),
        name: `name-${number < 10 ? ('0' + number) : number.toString()}`
    }));

describe('sorted set', () => {
    describe('initializes', () => {
        test('empty', () => {
            const set = new SortedSet<TestIdentifiable>();
            expect(set.collection).toEqual([]);
        });
    
        test('with entities', () => {
            const set = new SortedSet([...testIdentifiables]);
            expect(set.collection).toEqual(
                expect.arrayContaining(testIdentifiables)
            );
        });
    
        test('sorts collection', () => {
            const set = new SortedSet([...testIdentifiables].reverse());
            expect(set.collection).toEqual(
                expect.arrayContaining(testIdentifiables)
            );
        });
    });

    describe('iteratable', () => {
        test('empty', () => {
            const set = new SortedSet<TestIdentifiable>();
            const iterated = [...set];
            expect(iterated).toHaveLength(0);
        })

        test('single element', () => {
            const set = new SortedSet([testIdentifiables[0]]);
            const iterated = [...set];
            expect(iterated).toHaveLength(1);
        })

        test('multiple elements', () => {
            const set = new SortedSet([...testIdentifiables]);
            const iterated = [...set];
            expect(iterated).toHaveLength(testIdentifiables.length);
        })
    })

    describe('contains id', () => {
        test('contains id', () => {
            const set = new SortedSet([...testIdentifiables]);

            expect(set.containsKey('0')).toBe(true);
            expect(set.containsKey('37')).toBe(true);
            expect(set.containsKey('60')).toBe(true);
            expect(set.containsKey('99')).toBe(true);
        })

        test('doesnt contain id', () => {
            const set = new SortedSet([...testIdentifiables]);

            expect(set.containsKey('-1')).not.toBe(true);
            expect(set.containsKey('banana')).not.toBe(true);
            expect(set.containsKey('100')).not.toBe(true);
        })

        test('custom keygetter', () => {
            const set = new SortedSet([...testIdentifiables], nameKeyGetter);

            expect(set.containsKey('name-0')).toBe(true);
            expect(set.containsKey('name-93')).toBe(true);
            expect(set.containsKey('60')).not.toBe(true);
            expect(set.containsKey('99')).not.toBe(true);
        })
    });

    describe('contains', () => {
        test('does contain', () => {
            const set = new SortedSet([...testIdentifiables]);

            expect(set.contains(testIdentifiables[0])).toBe(true);
            expect(set.contains(testIdentifiables[50])).toBe(true);
            expect(set.contains(testIdentifiables[99])).toBe(true);
        });

        test('does not contain', () => {
            const set = new SortedSet([...testIdentifiables]);

            expect(set.contains({ id: '-1', name: '-1' })).not.toBe(true);
            expect(set.contains({ id: 'banana', name: 'banana' })).not.toBe(true);
            expect(set.contains({ id: '100', name: '100' })).not.toBe(true);
        })

        test('custom keygetter', () => {
            const set = new SortedSet([...testIdentifiables], nameKeyGetter);

            expect(set.contains(testIdentifiables[0])).toBe(true);
            expect(set.contains({ id: '0', name: 'name-unknown' })).not.toBe(true);
        })
    })

    describe('remove by key', () => {
        test('removes first', () => {
            const set = new SortedSet([...testIdentifiables]);
    
            set.removeByKey('0');
    
            expect(set.containsKey('0')).not.toBe(true);
            expect(set.contains(testIdentifiables[0])).not.toBe(true);
            expect(set.collection).toHaveLength(99);
        })
        
        test('removes last', () => {
            const set = new SortedSet([...testIdentifiables]);

            set.removeByKey('99');
            
            expect(set.containsKey('99')).not.toBe(true);
            expect(set.contains(testIdentifiables[99])).not.toBe(true);
            expect(set.collection).toHaveLength(99);
        })

        test('removes middle', () => {
            const set = new SortedSet([...testIdentifiables]);

            set.removeByKey('45');

            expect(set.containsKey('45')).not.toBe(true);
            expect(set.contains(testIdentifiables[45])).not.toBe(true);
            expect(set.collection).toHaveLength(99);
        })

        test('remove multiples', () => {
            const set = new SortedSet([...testIdentifiables]);

            set.removeByKey('3');
            set.removeByKey('70');
            set.removeByKey('52');

            expect(set.containsKey('3')).not.toBe(true);
            expect(set.contains(testIdentifiables[3])).not.toBe(true);

            expect(set.containsKey('70')).not.toBe(true);
            expect(set.contains(testIdentifiables[70])).not.toBe(true);

            expect(set.containsKey('52')).not.toBe(true);
            expect(set.contains(testIdentifiables[52])).not.toBe(true);

            expect(set.collection).toHaveLength(97);
        })

        test('remove nonexistent does nothing', () => {
            const set = new SortedSet([...testIdentifiables]);

            set.removeByKey('foogle');

            expect(set.collection).toHaveLength(testIdentifiables.length);
        })
    })

    describe('remove', () => {
        test('removes first', () => {
            const set = new SortedSet([...testIdentifiables]);
    
            set.remove(testIdentifiables[0]);
    
            expect(set.containsKey('0')).not.toBe(true);
            expect(set.contains(testIdentifiables[0])).not.toBe(true);
            expect(set.collection).toHaveLength(99);
        })
        
        test('removes last', () => {
            const set = new SortedSet([...testIdentifiables]);

            set.remove(testIdentifiables[99]);
            
            expect(set.containsKey('99')).not.toBe(true);
            expect(set.contains(testIdentifiables[99])).not.toBe(true);
            expect(set.collection).toHaveLength(99);
        })

        test('removes middle', () => {
            const set = new SortedSet([...testIdentifiables]);

            set.remove(testIdentifiables[45]);

            expect(set.containsKey('45')).not.toBe(true);
            expect(set.contains(testIdentifiables[45])).not.toBe(true);
            expect(set.collection).toHaveLength(99);
        })

        test('remove multiples', () => {
            const set = new SortedSet([...testIdentifiables]);

            set.remove(testIdentifiables[3]);
            set.remove(testIdentifiables[70]);
            set.remove(testIdentifiables[52]);

            expect(set.containsKey('3')).not.toBe(true);
            expect(set.contains(testIdentifiables[3])).not.toBe(true);

            expect(set.containsKey('70')).not.toBe(true);
            expect(set.contains(testIdentifiables[70])).not.toBe(true);

            expect(set.containsKey('52')).not.toBe(true);
            expect(set.contains(testIdentifiables[52])).not.toBe(true);

            expect(set.collection).toHaveLength(97);
        })

        test('remove nonexistent does nothing', () => {
            const set = new SortedSet([...testIdentifiables]);

            set.remove({ id: 'foogle', name: 'foogle' });

            expect(set.collection).toHaveLength(testIdentifiables.length);
        })
    })

    describe('add', () => {
        test('single', () => {
            const set = new SortedSet([...testIdentifiables]);
            const added = { id: '100', name: 'name-100' };
    
            set.add(added);
    
            expect(set.containsKey('100')).toBe(true);
            expect(set.contains(added)).toBe(true);
            expect(set.collection).toHaveLength(101);
        })

        test('multiple', () => {
            const set = new SortedSet([...testIdentifiables]);
            const add1 = { id: '100', name: 'name-100' }
            const add2 = { id: 'banana', name: 'name-banana' };
            const add3 = { id: '-1', name: 'name--1' }

            set.add(add1);
            set.add(add2);
            set.add(add3);

            expect(set.containsKey(add1.id)).toBe(true);
            expect(set.contains(add1)).toBe(true);

            expect(set.containsKey(add2.id)).toBe(true);
            expect(set.contains(add2)).toBe(true);

            expect(set.containsKey(add3.id)).toBe(true);
            expect(set.contains(add3)).toBe(true);

            expect(set.collection).toHaveLength(103);
        })

        test('maintains order', () => {
            const set = new SortedSet([...testIdentifiables]);
            const add1 = { id: '100', name: 'z' }
            const add2 = { id: 'banana', name: 'zzz' };
            const add3 = { id: '-1', name: 'aa' }
            set.add(add1);
            set.add(add2);
            set.add(add3);

            expect(set.collection[0]).toBe(add3);
            expect(set.collection[101]).toBe(add1);
            expect(set.collection[102]).toBe(add2);
        })

        test('duplicate names stable insert', () => {
            const set = new SortedSet([...testIdentifiables]);
            const add = { id: '101', name: 'name-00'};
            set.add(add);

            expect(set.collection[1]).toBe(add);
        })
    })

    describe('add range', () => {
        test('add single', () => {
            const set = new SortedSet([...testIdentifiables]);
            const add1 = { id: '100', name: 'name-100' }

            set.addRange(add1);

            expect(set.containsKey(add1.id)).toBe(true);
            expect(set.contains(add1)).toBe(true);

            expect(set.collection).toHaveLength(101);
        })

        test('add multiple', () => {
            const set = new SortedSet([...testIdentifiables]);
            const add1 = { id: '100', name: 'name-100' };
            const add2 = { id: 'banana', name: 'name-banana' };
            const add3 = { id: '-1', name: 'name--1' };

            set.addRange(add1, add2, add3);

            expect(set.containsKey(add1.id)).toBe(true);
            expect(set.contains(add1)).toBe(true);

            expect(set.containsKey(add2.id)).toBe(true);
            expect(set.contains(add2)).toBe(true);

            expect(set.containsKey(add3.id)).toBe(true);
            expect(set.contains(add3)).toBe(true);

            expect(set.collection).toHaveLength(103);
        })

        test('duplicate names stable insert', () => {
            const set = new SortedSet([...testIdentifiables]);
            const add1 = { id: '101', name: 'name-00' };
            const add2 = { id: '102', name: 'name-00' };

            set.add(add1);
            set.add(add2);

            expect(set.collection[1]).toBe(add1);
            expect(set.collection[2]).toBe(add2);
        })
    })

    describe('get', () => {
        test('no subtype gets when match', () => {
            const set = new SortedSet([...testIdentifiables]);

            const received1 = set.get('0');
            const received2 = set.get('50');
            const received3 = set.get('99');

            expect(received1).toEqual(testIdentifiables[0]);
            expect(received2).toEqual(testIdentifiables[50]);
            expect(received3).toEqual(testIdentifiables[99]);
        })

        test('no subtype does not get when no match', () => {
            const set = new SortedSet([...testIdentifiables]);

            const received1 = set.get('-1');
            const received2 = set.get('banana');
            const received3 = set.get('100');

            expect(received1).toBeUndefined();
            expect(received2).toBeUndefined();
            expect(received3).toBeUndefined();
        })

        test('request subtype gets when match', () => {
            const set = new SortedSet([...testIdentifiables]);

            const add: TestIdentifiableExtended = { id: 'banana', name: 'banana', roshambo: 'badoogle' }
            set.add(add);

            const received = set.get<TestIdentifiableExtended>(add.id, isTestIdentifiableExtended);

            expect(received).toBeDefined();
            expect(received).toEqual(add);
            expect(isTestIdentifiableExtended(received!)).toBe(true)
        })

        test('returns undefined received null', () => {
            const set = new SortedSet([...testIdentifiables]);

            expect(set.get(null)).toBeUndefined();
        })

        test('returns undefined received undefined', () => {
            const set = new SortedSet([...testIdentifiables]);

            expect(set.get(undefined)).toBeUndefined();
        })
    })

    describe('update', () => {
        test('updates entity retrieved by key', () => {
            const set = new SortedSet([...testIdentifiables]);
            const updateTo: TestIdentifiableExtended = { id: '40', name: 'name-40', roshambo: 'roshambo' };
            
            set.update(updateTo);
            const received = set.get('40');

            expect(received).toBe(updateTo);
        })

        test('updates entity in collection', () => {
            const set = new SortedSet([...testIdentifiables]);
            const updateTo: TestIdentifiableExtended = { id: '40', name: 'name-40', roshambo: 'roshambo' };
            
            set.update(updateTo);

            expect(set.collection).toContain(updateTo);
            const received = set.get('40') as TestIdentifiableExtended;
            expect(received.roshambo).toBe('roshambo');
        })
    })

    describe('add or update', () => {
        test('adds when not in set', () => {
            const set = new SortedSet([...testIdentifiables]);
            const add = { id: 'apple', name: 'apple' };

            set.addOrUpdate(add);

            expect(set.collection).toContain(add);
        })

        test('updates when in set', () => {
            const set = new SortedSet([...testIdentifiables]);
            const update = { id: '40', name: 'apple' };

            set.addOrUpdate(update);

            const received = set.get('40');
            expect(received).not.toBeNull();
            expect(received!.name).toBe('apple');
        })
    })

    describe('add or update range', () => {
        test('adds when not in set', () => {
            const set = new SortedSet([...testIdentifiables]);
            const add1 = { id: 'apple', name: 'apple' };
            const add2 = { id: 'banana', name: 'banana' };

            set.addOrUpdateRange(add1, add2);

            expect(set.collection).toContain(add1);
            expect(set.collection).toContain(add2);
        })

        test('updates when in set', () => {
            const set = new SortedSet([...testIdentifiables]);
            const update1 = { id: '40', name: 'apple' };
            const update2 = { id: '80', name: 'banana' };

            set.addOrUpdateRange(update1, update2);

            let received = set.get('40');
            expect(received).not.toBeNull();
            expect(received!.name).toBe('apple');

            received = set.get('80');
            expect(received).not.toBeNull();
            expect(received!.name).toBe('banana');
        })

        test('adds and updates for multiple', () => {
            const set = new SortedSet([...testIdentifiables]);
            const add = { id: 'apple', name: 'apple' };
            const update = { id: '80', name: 'banana' };

            set.addOrUpdateRange(add, update);

            expect(set.collection).toContain(add);
            let received = set.get('apple');
            expect(received).not.toBeNull();
            expect(received!.name).toBe('apple');

            received = set.get('80');
            expect(received).not.toBeNull();
            expect(received!.name).toBe('banana');
        })
    })
})