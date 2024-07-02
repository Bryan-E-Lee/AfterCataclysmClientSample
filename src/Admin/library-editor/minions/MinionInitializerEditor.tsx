import React from "react";
import { MultiSelect } from "../../../components/inputs/selects/multiselect/MultiSelect";
import { CreatureTypeOptions } from "../../../entities/characters/CreatureType";
import { MinionInitializer } from "../../../entities/library/minions/Minion";
import { CopyableText } from "../../../components/theming/clipboard/CopyableText";
import { AbilitiesByLevelCollectionEditor } from "../AbilitiesByLevelCollectionEditor";

type Props = {
    initializer: MinionInitializer;
    update: (initializer: MinionInitializer) => unknown;
}

export const MinionInitializerEditor = (props: Props) => {
    const { initializer, update } = props;
    return (
        <>
            {initializer.id &&
                <div className="form-field">
                    <label>Id</label>
                    <CopyableText>
                        {initializer.id}
                    </CopyableText>
                </div>
            }
            <fieldset>
                <legend>Basics</legend>
                <div className="form-field">
                    <label>Name</label>
                    <input type='text' value={initializer.name}
                        onChange={(e) => update({ ...initializer, name: e.target.value })} />
                </div>
                <div className="form-field">
                    <label>Description</label>
                    <textarea value={initializer.description}
                        onChange={(e) => update({ ...initializer, description: e.target.value })}></textarea>
                </div>
                <div className="form-field">
                    <label>Creature Types</label>
                    <MultiSelect options={CreatureTypeOptions} selections={initializer.creatureTypes}
                        onChange={(creatureTypes) => update({ ...initializer, creatureTypes })} />
                </div>
                <div className="form-field">
                    <label>Base Health</label>
                    <input type='number' value={initializer.baseHealth} step={1}
                        onChange={(e) => update({ ...initializer, baseHealth: parseInt(e.target.value)})} />
                </div>
                <div className="form-field">
                    <label>Health Scale</label>
                    <input type='number' value={initializer.healthScale} step={1}
                        onChange={(e) => update({ ...initializer, healthScale: parseInt(e.target.value) })} />
                </div>
                <div className="form-field">
                    <label>Armor</label>
                    <input type='number' value={initializer.armor} step={1}
                        onChange={(e) => update({ ...initializer, armor: parseInt(e.target.value) })} />
                </div>
                <div className="form-field">
                    <label>Resilience</label>
                    <input type='number' value={initializer.resilience} step={1}
                        onChange={(e) => update({ ...initializer, resilience: parseInt(e.target.value) })} />
                </div>
            </fieldset>
            
            <fieldset>
                <legend>Skill Features</legend>
                <AbilitiesByLevelCollectionEditor collections={initializer.featuresByLevel}
                    update={(skillFeatures) => update({ ...initializer, featuresByLevel: skillFeatures})} />
            </fieldset>
        </>
    );
}