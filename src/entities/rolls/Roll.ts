export type All = {
    name: 'All';
    value: -1;
}

export type Bust = { 
    name: 'Bust';
    explanatoryName: undefined;
    value: 1;
}

export type Pair = {
    name: 'Pair';
    explanatoryName: undefined;
    value: 2;
}

export type TwoPair = {
    name: 'Two Pair';
    explanatoryName: undefined;
    value: 3;
}

export type Triple = {
    name: 'Triple';
    explanatoryName: 'Three-of-a-Kind';
    value: 4;
}

export type SmallStraight = {
    name: 'Small Straight';
    explanatoryName: undefined;
    value: 5;
}

export type Flush = {
    name: 'Flush';
    explanatoryName: undefined;
    value: 6;
}

export type FullHouse = {
    name: 'Full House';
    explanatoryName: undefined;
    value: 7;
}

export type BigStraight = {
    name: 'Big Straight';
    explanatoryName: undefined;
    value: 8;
}

export type Quad = {
    name: 'Quad';
    explanatoryName: 'Four-of-a-Kind';
    value: 9;
}

export type Jackpot = {
    name: 'Jackpot!';
    explantoryName: 'Five-of-a-Kind';
    value: 10;
};

export type DieFace = 1 | 2 | 3 | 4 | 5 | 6;

export type DeclarableHandType = Pair | TwoPair | Triple | SmallStraight | Flush | FullHouse | BigStraight | Quad | Jackpot;
export type DeclarableHandTypeName = DeclarableHandType['name'];
export type HandType = DeclarableHandType | Bust | All;
export type HandTypeName = HandType['name'];

export type DeclarableHandMapType = {
    [name in DeclarableHandTypeName]: DeclarableHandType
}
export const DeclarableHands: DeclarableHandMapType = {
    "Pair": { name: 'Pair', value: 2 } as Pair,
    "Two Pair": { name: 'Two Pair', value: 3 } as TwoPair,
    "Triple": { name: 'Triple', explanatoryName: 'Three-of-a-Kind', value: 4 } as Triple,
    "Small Straight": { name: 'Small Straight', value: 5 } as SmallStraight,
    "Flush": { name: 'Flush', value: 6 } as Flush,
    "Full House": { name: 'Full House', value: 7 } as FullHouse,
    "Big Straight": { name: 'Big Straight', value: 8 } as BigStraight,
    "Quad": { name: 'Quad', explanatoryName: 'Four-of-a-Kind', value: 9 } as Quad,
    "Jackpot!": { name: 'Jackpot!', explantoryName: 'Five-of-a-Kind', value: 10 } as Jackpot
}

export type HandMapType = {
    [name in HandTypeName]: HandType
}
export const Hands: HandMapType = {
    ...DeclarableHands,
    "Bust": { name: "Bust", value: 1 } as Bust,
    "All": { name: "All", value: -1 } as All,
}

export const HandTypeNames = Object.values(DeclarableHands).map(handType => handType.name);

type MultipleComparer = {
    [face in DieFace]: number;
}

export class Hand {
    public constructor(...rolls: DieFace[]) {
        this.rolls = rolls;
        this.rollHistory = [];
        this.rollHistory.push([...this.rolls]);
    }

    public readonly rollHistory: number[][];
    public rolls: DieFace[] = [];

    public static readonly MinHandSize: number = 5;
    public static readonly BaseDiceCount: number = 3;
    public static GetRandomDieFace(): DieFace {
        const baseValue = Math.floor(Math.random() * 6);
        return <DieFace>(baseValue + 1);
    }

    public static CreateRandomHand(extraRolls: number = 0): Hand {
        const totalRolls = Hand.BaseDiceCount + extraRolls;
        const rolls: DieFace[] = [];
        for(let i = 0; i < totalRolls; i++) {
            rolls.push(Hand.GetRandomDieFace());
        }
        return new Hand(...rolls);
    }

    public rerollDice(...indices: number[]): void {
        if(!indices.every(index => index >= 0 && index < this.rolls.length)) {
            throw 'Invalid indices selected to reroll.';
        }

        for(let i = 0; i < indices.length; i++) {
            const index = indices[i];
            this.rolls[index] = Hand.GetRandomDieFace();
        }
        this.rollHistory.push([...this.rolls]);
    }

    public get isPair(): boolean {
        return this.numberOfDuplicates >= 1;
    }

    public get isTwoPair(): boolean {
        return this.numberOfDuplicates >= 2;
    }

    public get isTriple(): boolean {
        return this.maxMultipleCount >= 3;
    }

    public get isSmallStraight(): boolean {
        return this.longestStraight >= 4;
    }

    public get isFlush(): boolean {
        return (
            this.rolls.filter((roll) => roll % 2 === 0).length >= 5
            || this.rolls.filter((roll) => roll % 2 === 1).length >= 5
        );
    }

    public get isFullHouse(): boolean {
        return this.numberOfDuplicates >= 2 && this.maxMultipleCount >= 3;
    }

    public get isBigStraight(): boolean {
        return this.longestStraight >= 5;
    }

    public get isQuad(): boolean {
        return this.maxMultipleCount >= 4;
    }

    public get isJackpot(): boolean {
        return this.maxMultipleCount >= 5;
    }

    public get handTypes(): HandType[] {
        const handTypes: HandType[] = [];
        if(this.isPair) {
            handTypes.push(DeclarableHands["Pair"]);
        }
        if(this.isTwoPair) {
            handTypes.push(DeclarableHands["Two Pair"]);
        }
        if(this.isTriple) {
            handTypes.push(DeclarableHands["Triple"]);
        }
        if(this.isSmallStraight) {
            handTypes.push(DeclarableHands["Small Straight"]);
        }
        if(this.isFlush) {
            handTypes.push(DeclarableHands["Flush"]);
        }
        if(this.isFullHouse) {
            handTypes.push(DeclarableHands["Full House"]);
        }
        if(this.isBigStraight) {
            handTypes.push(DeclarableHands["Big Straight"]);
        }
        if(this.isQuad) {
            handTypes.push(DeclarableHands["Quad"]);
        }
        if(this.isJackpot) {
            handTypes.push(DeclarableHands["Jackpot!"]);
        }
        return handTypes;
    }

    private get numberOfDuplicates(): number {
        const seen: number[] = [];
        const skips: number[] = [];
        let duplicates = 0;
        for (let rollIndex = 0; rollIndex < this.rolls.length; rollIndex++) {
            const roll = this.rolls[rollIndex];
            if (seen.includes(roll) && !skips.includes(roll)) {
                duplicates++;
                skips.push(roll);
            } else {
                seen.push(roll);
            }
        }
        return duplicates;
    }

    private get maxMultipleCount(): number {
        const seen: MultipleComparer = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
        };
        for (let rollIndex = 0; rollIndex < this.rolls.length; rollIndex++) {
            const roll = this.rolls[rollIndex];
            if (seen[roll] != null) {
                seen[roll]++;
            } else {
                seen[roll] = 1;
            }
        }
        return Math.max(...(<number[]>Object.values(seen)));
    }

    private get longestStraight(): number {
        const hits = [1];
        let currentHitIndex = 0;
        const checkHand = this.rolls.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });
        checkHand.sort();
        for (let index = 0; index < checkHand.length; index++) {
            if (checkHand[index] === checkHand[index - 1] + 1) {
                hits[currentHitIndex]++;
            } else {
                currentHitIndex++;
                hits.push(1);
            }
        }
        return Math.max(...hits);
    }
}
