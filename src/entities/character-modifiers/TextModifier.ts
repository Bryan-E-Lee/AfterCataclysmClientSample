import { Character } from "../characters/Character";
import { CharacterModifier, ValueType } from "./CharacterModifier";


export const CombineTextModifiers = (...containers: (TextModifierContainer[])[]): TextModifier[] => {
    return containers.reduce((accum: TextModifierContainer[], curr: TextModifierContainer[]) => [...accum, ...curr], [])
        .reduce((accum: TextModifier[], curr: TextModifierContainer) => [...accum, ...curr.textModifiers], []);
}

export interface TextModifierContainer {
    textModifiers: TextModifier[];
}

export abstract class TextModifier implements CharacterModifier {
    public abstract readonly valueType: ValueType;
    public abstract modify(character: Character): string;
}

export abstract class HealthTextModifier extends TextModifier {
    public readonly valueType: 'Health' = 'Health';
}

export abstract class WoundsTextModifier extends TextModifier {
    public readonly valueType: 'Wounds' = 'Wounds';
}