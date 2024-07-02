import React from "react";
import { ThemedButton } from "../../components/inputs/buttons/ThemedButton";
import { AbilitiesByLevelCollection } from "../../entities/abilities/AbilitiesByLevelCollection";
import { ActiveAbilityCollectionCreator } from "./abilities/ActiveAbilityCollectionCreator";
import { ReactiveAbilityCollectionCreator } from "./abilities/ReactiveAbilityCollectionCreator";
import { PassiveAbilityCollectionCreator } from "./abilities/PassiveAbilityCollectionCreator";

type Props = {
    collections: AbilitiesByLevelCollection[];
    update: (collections: AbilitiesByLevelCollection[]) => void;
}

export const AbilitiesByLevelCollectionEditor: React.FC<Props> = (props: Props) => {
    const { collections, update } = props;
    const sortedCollections = collections.sort((a, b) => a.level - b.level);
    return (
        <div>
            <ThemedButton onClick={() => update([
                ...collections,
                {
                    level: 1,
                    activeAbilities: [],
                    reactiveAbilities: [],
                    passiveAbilities: [],
                }
            ])}>Add</ThemedButton>
            {sortedCollections.map((sf, index) => (
                <AbilitiesByLevelCollectionComponent key={index} collection={sf}
                    update={(skillFeature: AbilitiesByLevelCollection) => {
                        collections.splice(index, 1, skillFeature);
                        update(collections)
                    }}
                    onDelete={() => {
                        collections.splice(index, 1);
                        update(collections);
                    }} />
            ))}
        </div>
    );
}

type ComponentProps = {
    collection: AbilitiesByLevelCollection;
    update: (collection: AbilitiesByLevelCollection) => void;
    onDelete: () => void;
};

const AbilitiesByLevelCollectionComponent: React.FC<ComponentProps> = (props: ComponentProps) => {
    const { collection, update, onDelete } = props;
    const namePostFix = `(lv. ${collection.level})`;
    return (
        <div>
            <div className="form-field">
                <label>Level</label>
                <input type='number' value={collection.level} min={0} max={10}
                    onChange={(e) => update({ ...collection, level: parseInt(e.target.value) })} />
            </div>
            <fieldset>
                <legend>Abilities</legend>
                <div className="form-field">
                    <label>Actions</label>
                    <ActiveAbilityCollectionCreator actions={collection.activeAbilities ?? []} namePostFix={namePostFix}
                        update={(activeAbilities) => update({ ...collection, activeAbilities })} />
                </div>
                <div className="form-field">
                    <label>Reactions</label>
                    <ReactiveAbilityCollectionCreator reactions={collection.reactiveAbilities ?? []} namePostFix={namePostFix}
                        onUpdate={(reactiveAbilities) => update({ ...collection, reactiveAbilities })} />
                </div>
                <div className="form-field">
                    <label>Passives</label>
                    <PassiveAbilityCollectionCreator passives={collection.passiveAbilities ?? []} namePostFix={namePostFix}
                        update={(passiveAbilities) => update({ ...collection, passiveAbilities})} />
                </div>
            </fieldset>
            <ThemedButton onClick={onDelete}>
                Delete
            </ThemedButton>
        </div>
    );
}