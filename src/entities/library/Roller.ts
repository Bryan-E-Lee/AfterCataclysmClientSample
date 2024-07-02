import { getPluralityCharacter } from "../../utils/StringUtilities";
import { Character } from "../characters/Character";

export interface Rollable {
    name: string;
    getRoller(character: Character): Roller;
}

export function GetRerollsForLevel(level: number): number {
        if (level >= 7) {
            return 2;
        }
        if (level >= 3) {
            return 1;
        }
        return 0;
}

export function GetExtraRollsForLevel(level: number): number {
        if(level >= 9) {
            return 2;
        }
        if(level >= 5) {
            return 1;
        }
        return 0;
}

export class Roller {
    public constructor(level: number) {
        this.level = level;
    }

    private readonly level: number;

    public get extraRolls(): number {
        return GetExtraRollsForLevel(this.level);
    }

    private get rollsPlurality(): string {
        return getPluralityCharacter(this.extraRolls);
    }

    public get rerolls(): number {
        return GetRerollsForLevel(this.level);
    }

    private get rerollsPlurality(): string {
        return getPluralityCharacter(this.rerolls);
    }

    public get diceBoons(): string {
        let extraRollsText = '';
        if (this.extraRolls > 0) {
            extraRollsText = `+${this.extraRolls} roll${this.rollsPlurality}, `;
        }

        let rerollsText = 'No boons.';
        if (this.rerolls > 0) {
            rerollsText = `+${this.rerolls} reroll${this.rerollsPlurality}`;
        }
        return `${extraRollsText}${rerollsText}`;
    }
}