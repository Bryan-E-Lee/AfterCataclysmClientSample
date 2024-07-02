import { Character } from "../characters/Character";
import { FilterSkillsForJuice } from "../library/skills/SkillFilters";
import { SkillName } from "../library/skills/SkillMap";
import { CharacterModifier, ValueType } from "./CharacterModifier";

export const CombineValueModifiers = (...containers: (ValueModifierContainer[])[]): ValueModifier[] => {
    return containers.reduce((accum: ValueModifierContainer[], curr: ValueModifierContainer[]) => [...accum, ...curr], [])
        .reduce((accum: ValueModifier[], curr: ValueModifierContainer) => [...accum, ...curr.valueModifiers], []);
}

export const CoalesceValues = (valueType: ValueType, character: Character, valueModifiers: ValueModifier[]): number => {
    return valueModifiers
        .filter(vm => vm.valueType == valueType)
        .map(vm => vm.modify(character))
        .reduce((accum: number, curr: number) => accum + curr, 0);
}

export interface ValueModifierContainer {
    valueModifiers: ValueModifier[];
}

export interface SourcedValue {
    source: string;
    value: number;
}

export abstract class ValueModifier implements CharacterModifier {
    public abstract source: string;
    public abstract readonly valueType: ValueType;
    public abstract modify(character: Character): number;
}

export abstract class HealthValueModifier extends ValueModifier {
    public readonly valueType: 'Health' = 'Health';
}

export abstract class WoundsValueModifier extends ValueModifier {
    public readonly valueType: 'Wounds' = 'Wounds';
}

export abstract class JuiceValueModifier extends ValueModifier {
    public readonly valueType: 'Juice' = 'Juice';

    public modify(character: Character): number {
        const juiceSkills = character.skills.collection.filter(FilterSkillsForJuice);
        const highestJuiceSkillLevel = juiceSkills.max(skill => skill.adjustedLevel);
        const highestJuiceSkill = juiceSkills.first(js => js.adjustedLevel == highestJuiceSkillLevel);
        if (highestJuiceSkill?.name == this.source) {
            return 2 * (highestJuiceSkill.level + character.level);
        }
        else {
            return 0;
        }
    }
}

export abstract class SkillValueModifier extends ValueModifier {
    public abstract readonly valueType: SkillName;
}

export abstract class HordeSizeValueModifier extends ValueModifier {
    public readonly valueType: 'HordeSize' = 'HordeSize';
}