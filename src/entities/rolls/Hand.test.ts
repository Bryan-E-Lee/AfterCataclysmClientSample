import 'jest';
import { Hand } from './Roll';

describe('hand', () => {
    describe('constructor', () => {
        test('single rolls', () => {
            const hand = new Hand(3);
            
            expect(hand.rolls).toHaveLength(1);
            expect(hand.rolls[0]).toBe(3);
        })

        test('multiple rolls', () => {
            const hand = new Hand(3,4,5);

            expect(hand.rolls).toHaveLength(3);
        })

        test('max rolls', () => {
            const hand = new Hand(3,4,5,6,4,1,2);
            
            expect(hand.rolls).toHaveLength(7);
        })

        test('sorts rolls descending', () => {
            const hand = new Hand(3,5,4,2,1,6);

            console.log(hand.rolls);

            expect(hand.rolls[0]).toBeGreaterThan(hand.rolls[1]);
            expect(hand.rolls[1]).toBeGreaterThan(hand.rolls[2]);
            expect(hand.rolls[2]).toBeGreaterThan(hand.rolls[3]);
            expect(hand.rolls[3]).toBeGreaterThan(hand.rolls[4]);
            expect(hand.rolls[4]).toBeGreaterThan(hand.rolls[5]);
        })

        test('sets first history record', () => {
            const hand = new Hand(3,5,4,2,1,6);

            expect(hand.rollHistory[0]).toHaveLength(6);
            expect(hand.rollHistory[0]).toEqual(expect.arrayContaining([1,2,3,4,5,6]));
        })
    })
    
    describe('reroll', () => {
        beforeEach(() => {
            jest.spyOn(Hand, 'GetRandomDieFace').mockReturnValue(1);
        })

        afterEach(() => {
            jest.spyOn(Hand, 'GetRandomDieFace').mockRestore();
        })

        test('rerolls single die at index', () => {
            const hand = new Hand(3,4,5);

            hand.rerollDice(0);

            expect(hand.rolls[0]).toBe(1);
        })

        test('rerolls multiple die at indices', () => {
            const hand = new Hand(3,4,5);

            hand.rerollDice(1,2);

            expect(hand.rolls[1]).toBe(1);
            expect(hand.rolls[2]).toBe(1);
        })

        test('adds to history', () => {
            const hand = new Hand(3,4,5);

            hand.rerollDice(1,2);

            expect(hand.rollHistory[0]).toEqual(expect.arrayContaining([5,4,3]));
            expect(hand.rollHistory[1]).toEqual(expect.arrayContaining([5,1,1]));
        })
    })

    describe('hand type checkers', () => {
        describe('is pair', () => {
            test('is pair simplest', () => {
                const hand = new Hand(1,1);
                expect(hand.isPair).toBe(true);
            })

            test('is not pair simplest', () => {
                const hand = new Hand(1,2);
                expect(hand.isPair).not.toBe(true);
            })

            test('is pair full hand', () => {
                const hand = new Hand(1,4,5,3,1);
                expect(hand.isPair).toBe(true);
            })

            test('is not pair full hand', () => {
                const hand = new Hand(1,2,3,4,5);
                expect(hand.isPair).not.toBe(true);
            })
        })

        describe('is two pair', () => {
            test('is two pair simplest', () => {
                const hand = new Hand(1,1,2,2);
                expect(hand.isTwoPair).toBe(true);
            })

            test('is not two pair simplest', () => {
                const hand = new Hand(1,2,3,4);
                expect(hand.isTwoPair).not.toBe(true);
            })

            test('is two pair full hand', () => {
                const hand = new Hand(1,1,2,2,4);
                expect(hand.isTwoPair).toBe(true);
            })

            test('is not two pair full hand', () => {
                const hand = new Hand(1,2,3,4,6);
                expect(hand.isTwoPair).toBe(false);
            })
        })

        describe('is triple', () => {
            test('is triple simplest', () => {
                const hand = new Hand(1,1,1);
                expect(hand.isTriple).toBe(true);
            })

            test('is not triple simplest', () => {
                const hand = new Hand(1,2,3);
                expect(hand.isTriple).not.toBe(true);
            })

            test('is triple full hand', () => {
                const hand = new Hand(1,1,1,4,5);
                expect(hand.isTriple).toBe(true);
            })

            test('is not triple full hand', () => {
                const hand = new Hand(1,2,4,5,6);
                expect(hand.isTriple).not.toBe(true);
            })
        })

        describe('is small straight', () => {
            test('is small straight simplest', () => {
                const hand = new Hand(1,2,3,4);
                expect(hand.isSmallStraight).toBe(true);
            })

            test('is not small straight simplest', () => {
                const hand = new Hand(1,2,3,5);
                expect(hand.isSmallStraight).not.toBe(true);
            })

            test('is small straight full hand', () => {
                const hand = new Hand(1,3,4,5,6);
                expect(hand.isSmallStraight).toBe(true);
            })

            test('is not small straight full hand', () => {
                const hand = new Hand(1,2,4,5,6);
                expect(hand.isSmallStraight).not.toBe(true);
            })
        })

        test('is flush', () => {
            const hand = new Hand(1,3,5,3,1);
            expect(hand.isFlush).toBe(true);
        })

        test('is not flush', () => {
            const hand = new Hand(1,1,4,5,2);
            expect(hand.isFlush).not.toBe(true);
        })

        test('is full house', () => {
            const hand = new Hand(1,1,2,2,2);
            expect(hand.isFullHouse).toBe(true);
        })

        test('is not full house', () => {
            const hand = new Hand(1,2,3,5,5);
            expect(hand.isFullHouse).not.toBe(true);
        })

        test('is big straight', () => {
            const hand = new Hand(2,3,4,5,6);
            expect(hand.isBigStraight).toBe(true);
        })

        test('is not big straight', () => {
            const hand = new Hand(1,2,3,5,6);
            expect(hand.isBigStraight).toBe(false);
        })

        describe('is quad', () => {
            test('is quad simplest', () => {
                const hand = new Hand(1,1,1,1);
                expect(hand.isQuad).toBe(true);
            })

            test('is not quad simplest', () => {
                const hand = new Hand(1,1,1,3);
                expect(hand.isQuad).not.toBe(true);
            })

            test('is quad full hand', () => {
                const hand = new Hand(1,1,1,1,5);
                expect(hand.isQuad).toBe(true);
            })

            test('is not quad full hand', () => {
                const hand = new Hand(1,3,5,4,2);
                expect(hand.isQuad).not.toBe(true);
            })
        })

        test('is jackpot', () => {
            const hand = new Hand(1,1,1,1,1);
            expect(hand.isJackpot).toBe(true);
        })

        test('is not jackpot', () => {
            const hand = new Hand(1,2,3,5,1);
            expect(hand.isJackpot).not.toBe(true);
        })
    })

    describe('hand types', () => {
        test('single hand type pair', () => {
            const hand = new Hand(1,1,3,5,6);

            expect(hand.handTypes).toHaveLength(1);
            expect(hand.handTypes[0].name).toBe('Pair');
        })

        test('two sorted hand types triple', () => {
            const hand = new Hand(1,1,1,4,5);

            expect(hand.handTypes).toHaveLength(2);
            expect(hand.handTypes[0].name).toBe('Pair');
            expect(hand.handTypes[1].name).toBe('Triple');
        })

        test('multiple sorted hand types', () => {
            const hand = new Hand(1,1,1,1,1);

            expect(hand.handTypes).toHaveLength(5);
            expect(hand.handTypes[0].name).toBe('Pair');
            expect(hand.handTypes[1].name).toBe('Triple');
            expect(hand.handTypes[2].name).toBe('Flush');
            expect(hand.handTypes[3].name).toBe('Quad');
            expect(hand.handTypes[4].name).toBe('Jackpot!');
        })
    })

    describe('create random hand', () => {
        beforeEach(() => {
            jest.spyOn(Hand, 'GetRandomDieFace').mockReturnValue(1);
        })

        afterEach(() => {
            jest.spyOn(Hand, 'GetRandomDieFace').mockRestore();
        })

        test('uses random faces no extra rolls', () => {
            const hand = Hand.CreateRandomHand();
            
            expect(hand.rolls).toHaveLength(3);
            expect(hand.rolls).toEqual(expect.arrayContaining([1,1,1,1,1]));
        })

        test('creates larger hand with extra rolls', () => {
            const hand = Hand.CreateRandomHand(2);

            expect(hand.rolls).toHaveLength(5);
            expect(hand.rolls).toEqual(expect.arrayContaining([1,1,1,1,1,1,1]));
        })
    })
})