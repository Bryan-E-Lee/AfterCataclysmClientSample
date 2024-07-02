import React from "react"
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton"
import { ActiveAbility } from "../../../entities/abilities/ActiveAbility"
import { AbilityType, Ability } from "../../../entities/abilities/Ability"
import { LevelRestrictedAbilityCollection } from "../../../entities/abilities/LevelRestrictedAbilityCollection"
import { PassiveAbility } from "../../../entities/abilities/PassiveAbility"
import { ReactiveAbility } from "../../../entities/abilities/ReactiveAbility"
import { getUniqueIdentifier } from "../../../utils/GUID"
import { ActiveAbilityCollectionCreator } from "./ActiveAbilityCollectionCreator"
import { PassiveAbilityCollectionCreator } from "./PassiveAbilityCollectionCreator"
import { ReactiveAbilityCollectionCreator } from "./ReactiveAbilityCollectionCreator"

type Props<T extends Ability> = {
    abilityType: AbilityType;
    levelRestrictedAbilities: LevelRestrictedAbilityCollection<T>[];
    update: (restrictions: LevelRestrictedAbilityCollection<T>[]) => void;
}

export const AbilityByLevelCreator = <T extends Ability>(props: Props<T>) => {
    const { levelRestrictedAbilities, abilityType, update } = props;
    const sortedAbilities = levelRestrictedAbilities.sort((a, b) => a.level - b.level);
    return (
        <div>
            {sortedAbilities.map((lra, index) => <RestrictedAbilityEditor
                key={lra.id}
                abilityType={abilityType}
                restriction={lra}
                update={(updatedLra) => {
                    const restrictions = [...levelRestrictedAbilities];
                    restrictions.splice(index, 1, updatedLra);
                    restrictions.sort((r1, r2) => r1.level - r2.level);
                    update(restrictions);
                }}
                delete={() => {
                    const restrictions = [...levelRestrictedAbilities];
                    restrictions.splice(index, 1);
                    update(restrictions);
                }} />)}
                <ThemedButton onClick={() => {
                    const restrictions = [...levelRestrictedAbilities];
                    const newRestriction = {
                        id: getUniqueIdentifier(),
                        level: 0,
                        abilities: []
                    };
                    restrictions.insertAsSorted(newRestriction, lra => lra.level);
                    update(restrictions);
                }}>
                    + Add Level Restricted Abilities
                </ThemedButton>
        </div>
    );
}

type EditorProps<T extends Ability> = {
    abilityType: AbilityType;
    restriction: LevelRestrictedAbilityCollection<T>;
    update: (restriction: LevelRestrictedAbilityCollection<T>) => void;
    delete: () => void;
}

const RestrictedAbilityEditor = <T extends Ability>(props: EditorProps<T>) => {
    return (
        <div>
            <ThemedButton onClick={() => props.delete()}>
                Delete
            </ThemedButton>
            <div>
                <label>Level</label>
                <input type='number' value={props.restriction.level}
                    onChange={(e) => {
                        props.restriction.level = parseInt(e.target.value);
                        props.update(props.restriction);
                    }} />
            </div>
            <div>
                <label>{getDisplayNameFromAbilityType(props.abilityType)}</label>
                <GenericAbilityEditor
                    level={props.restriction.level}
                    abilityType={props.abilityType}
                    abilities={props.restriction.abilities}
                    update={(untypedAbilities) => {
                        const abilities = untypedAbilities as T[];
                        const restriction = { ...props.restriction, abilities };
                        props.update(restriction);
                    }} />
            </div>
        </div>
    );
}

const getDisplayNameFromAbilityType = (abilityType: AbilityType) => {
    if (abilityType == 'ActiveAbility') {
        return 'Actives';
    }
    else if (abilityType == 'ReactiveAbility') {
        return 'Reactions';
    }
    return 'Passives';
}

type GenericAbilityEditorProps = {
    level: number;
    abilityType: AbilityType;
    abilities: Ability[];
    update: (abilities: Ability[]) => void;
}

const GenericAbilityEditor: React.FC<GenericAbilityEditorProps> = (props: GenericAbilityEditorProps) => {
    const { level, abilityType, abilities, update } = props;
    if (abilityType == 'ActiveAbility') {
        return <ActiveAbilityCollectionCreator actions={abilities as ActiveAbility[]} namePostFix={`(lv. ${level}`} update={update} />;
    }
    else if (abilityType == 'ReactiveAbility') {
        return <ReactiveAbilityCollectionCreator reactions={abilities as ReactiveAbility[]} namePostFix={`(lv. ${level}`} onUpdate={update} />;
    }
    else {
        return <PassiveAbilityCollectionCreator passives={abilities as PassiveAbility[]} namePostFix={`(lv. ${level}`} update={update} />;
    }
}