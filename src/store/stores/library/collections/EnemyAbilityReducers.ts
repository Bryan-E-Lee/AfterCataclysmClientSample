import { SortedSet } from "../../../../entities/data-structures/SortedSet";
import { EnemyAbility, EnemyActiveAbility, EnemyPassiveAbility, EnemyReactiveAbility, isEnemyActiveAbility, isEnemyPassiveAbility, isEnemyReactiveAbility } from "../../../../entities/library/enemies/EnemyAbilities";

export type EnemyAbilityState = {
    enemyActiveAbilities: EnemyActiveAbility[];
    enemyReactiveAbilities: EnemyReactiveAbility[];
    enemyPassiveAbilities: EnemyPassiveAbility[];
    allEnemyAbilitiesLoaded: boolean;
}

type LoadEnemyAbilityAction = {
    abilities: EnemyAbility[];
    all?: boolean;
}

type CreateUpdateAction = { ability: EnemyAbility }
type DeleteAction = { id: string }

const loadEnemyAbilities = (state: EnemyAbilityState, action: LoadEnemyAbilityAction): EnemyAbilityState => {
    const { abilities, all } = action;

    const activeAbilities = new SortedSet(state.enemyActiveAbilities);
    const reactiveAbilities = new SortedSet(state.enemyReactiveAbilities);
    const passiveAbilities = new SortedSet(state.enemyPassiveAbilities);

    const newActiveAbilities = abilities.filter(isEnemyActiveAbility);
    activeAbilities.addOrUpdateRange(...newActiveAbilities);

    const newReactiveAbilities = abilities.filter(isEnemyReactiveAbility);
    reactiveAbilities.addOrUpdateRange(...newReactiveAbilities);

    const newPassiveAbilities = abilities.filter(isEnemyPassiveAbility);
    passiveAbilities.addOrUpdateRange(...newPassiveAbilities);

    return {
        ...state,
        enemyActiveAbilities: [...activeAbilities],
        enemyReactiveAbilities: [...reactiveAbilities],
        enemyPassiveAbilities: [...passiveAbilities],
        allEnemyAbilitiesLoaded: all ?? false,
    }
}

const createUpdateEnemyAbility = (state: EnemyAbilityState, action: CreateUpdateAction): EnemyAbilityState => {
    const { ability } = action;
    switch (ability.abilityType) {
        case 'ActiveAbility':
            const activeAbilities = new SortedSet(state.enemyActiveAbilities);
            activeAbilities.addOrUpdate(ability);
            return { ...state, enemyActiveAbilities: [...activeAbilities] }
        case 'ReactiveAbility':
            const reactiveAbilities = new SortedSet(state.enemyReactiveAbilities);
            reactiveAbilities.addOrUpdate(ability);
            return { ...state, enemyReactiveAbilities: [...reactiveAbilities] }
        case 'PassiveAbility':
            const passiveAbilities = new SortedSet(state.enemyPassiveAbilities);
            passiveAbilities.addOrUpdate(ability);
            return { ...state, enemyPassiveAbilities: [...passiveAbilities] }
        default:
            return state;
    }
}

const deleteEnemyAbility = (state: EnemyAbilityState, action: DeleteAction): EnemyAbilityState => {
    const { id } = action;
    return {
        ...state,
        enemyActiveAbilities: state.enemyActiveAbilities.filter(eaa => eaa.id != id),
        enemyReactiveAbilities: state.enemyReactiveAbilities.filter(era => era.id != id),
        enemyPassiveAbilities: state.enemyPassiveAbilities.filter(epa => epa.id != id),
    }
}

export const EnemyAbilityReducers = {
    loadEnemyAbilities,
    createUpdateEnemyAbility,
    deleteEnemyAbility,
}