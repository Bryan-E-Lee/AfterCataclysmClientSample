import React, { useEffect } from "react";
import { Enemy } from "../../../entities/library/enemies/Enemy"
import { CopyableText } from "../../../components/theming/clipboard/CopyableText";
import { useDispatch, useSelector } from "react-redux";
import { AdminState } from "../../store/stores/AdminState";
import { MultiSelect } from "../../../components/inputs/selects/multiselect/MultiSelect";
import { EnemyAbility, EnemyActiveAbility, EnemyPassiveAbility, EnemyReactiveAbility } from "../../../entities/library/enemies/EnemyAbilities";
import { ActiveAbilityCollectionCreator } from "../abilities/ActiveAbilityCollectionCreator";
import { ReactiveAbilityCollectionCreator } from "../abilities/ReactiveAbilityCollectionCreator";
import { PassiveAbilityCollectionCreator } from "../abilities/PassiveAbilityCollectionCreator";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";
import { StringListEditor } from "../StringListEditor";
import { SingleSelect } from "../../../components/inputs/selects/singleselect/SingleSelect";
import { RecordStatusOptions } from "../../../entities/RecordStatus";

type Props = {
    enemy: Enemy;
    update: (enemy: Enemy) => unknown;
}

const mapCommonAbilityToOption = (ability: EnemyAbility, abilityIds: string[]) => ({
    name: ability.name,
    value: ability.id,
    disabled: abilityIds.contains(ability.id)
})

export const EnemyEditorShared = (props: Props) => {
    const dispatch = useDispatch();
    const { enemy, update } = props;

    const {enemyActiveAbilities, allEnemyActiveAbilitiesLoaded,
        enemyReactiveAbilities, allEnemyReactiveAbilitiesLoaded,
        enemyPassiveAbilities, allEnemyPassiveAbilitiesLoaded} = useSelector((app: AdminState) => app.library);

    useEffect(() => {
        if (!allEnemyActiveAbilitiesLoaded) {
            dispatch(AdminLibraryActions.loadEnemyActiveAbilities());
        }
        if (!allEnemyReactiveAbilitiesLoaded) {
            dispatch(AdminLibraryActions.loadEnemyReactiveAbilities());
        }
        if (!allEnemyPassiveAbilitiesLoaded) {
            dispatch(AdminLibraryActions.loadEnemyPassiveAbilities());
        }
    }, [dispatch, enemyActiveAbilities, enemyReactiveAbilities, enemyPassiveAbilities]);

    const activeOptions = enemyActiveAbilities.map((eaa) => mapCommonAbilityToOption(eaa, enemy.commonActiveAbilities));
    const reactiveOptions = enemyReactiveAbilities.map((era) => mapCommonAbilityToOption(era, enemy.commonReactiveAbilities));
    const passiveOptions = enemyPassiveAbilities.map((epa) => mapCommonAbilityToOption(epa, enemy.commonPassiveAbilities));
    return (
        <>
            {enemy.id &&
                <div className="form-field">
                    <label>Id</label>
                    <CopyableText>
                        {enemy.id}
                    </CopyableText>
                </div>
            }
            <fieldset className="form-fieldset">
                <legend>Basics</legend>

                <label className="standout">Record Status</label>
                <SingleSelect options={RecordStatusOptions} selection={enemy.recordStatus}
                    onChange={(recordStatus) => update({ ...enemy, recordStatus })} />

                <label className="standout">Name</label>
                <input type="text" value={enemy.name} onChange={(e) => update({ ...enemy, name: e.target.value })} />
                
                <label className="standout">Description</label>
                <textarea value={enemy.description} onChange={(e) => update({ ...enemy, description: e.target.value })} />
                
                <label className="standout">Level</label>
                <input type="number" value={enemy.level} min={1} onChange={(e) => update({ ...enemy, level: parseInt(e.target.value) })} />
                
                <label className="standout">Health</label>
                <input type="number" value={enemy.health} min={1} onChange={(e) => update({ ...enemy, health: parseInt(e.target.value) })} />
                
                <label className="standout">Health Scale</label>
                <input type="number" value={enemy.healthScale} min={0} onChange={(e) => update({ ...enemy, healthScale: parseInt(e.target.value) })} />

                <label className="standout">Empowerment</label>
                <input type="number" value={enemy.empowerment} min={0} onChange={(e) => update({ ...enemy, empowerment: parseInt(e.target.value) })} />

                <label className="standout">Armor</label>
                <input type="number" value={enemy.armor} min={0} onChange={(e) => update({ ...enemy, armor: parseInt(e.target.value) })} />
                
                <label className="standout">Resilience</label>
                <input type="number" value={enemy.resilience} min={0} onChange={(e) => update({ ...enemy, resilience: parseInt(e.target.value) })} />
                
                <label className="standout">Movement</label>
                <input type="number" value={enemy.movement} min={0} onChange={(e) => update({ ...enemy, movement: parseInt(e.target.value) })} />
            </fieldset>
            <fieldset className="form-fieldset">
                <legend>Common Abilities</legend>
                <label className="standout">Active Abilities</label>
                <MultiSelect options={activeOptions} selections={enemy.commonActiveAbilities}
                    onChange={(ids) => update({ ...enemy, commonActiveAbilities: ids })}>
                </MultiSelect>

                <label className="standout">Reactive Abilities</label>
                <MultiSelect options={reactiveOptions} selections={enemy.commonReactiveAbilities}
                    onChange={(ids) => update({ ...enemy, commonReactiveAbilities: ids })}>
                </MultiSelect>
                
                <label className="standout">Passive Abilities</label>
                <MultiSelect options={passiveOptions} selections={enemy.commonPassiveAbilities}
                    onChange={(ids) => update({ ...enemy, commonPassiveAbilities: ids })}>
                </MultiSelect>
            </fieldset>
            <fieldset>
                <legend>Custom Abilities</legend>
                <ActiveAbilityCollectionCreator actions={enemy.activeAbilities} update={(abilities) => update({ ...enemy, activeAbilities: (abilities as EnemyActiveAbility[])})} />
                <ReactiveAbilityCollectionCreator reactions={enemy.reactiveAbilities} onUpdate={(abilities) => update({ ...enemy, reactiveAbilities: (abilities as EnemyReactiveAbility[])})} />
                <PassiveAbilityCollectionCreator passives={enemy.passiveAbilities} update={(abilities) => update({ ...enemy, passiveAbilities: (abilities as EnemyPassiveAbility[])})} />
            </fieldset>
            <fieldset>
                <legend>Tags</legend>
                <StringListEditor texts={enemy.tags} update={(tags) => update({ ...enemy, tags })} />
            </fieldset>
        </>
    )
}