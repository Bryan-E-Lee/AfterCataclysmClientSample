import React from "react";
import { CopyableText } from "../../../components/theming/clipboard/CopyableText";
import { Vehicle } from "../../../entities/library/vehicles/Vehicle";
import { ActiveAbilityCollectionCreator } from "../abilities/ActiveAbilityCollectionCreator";
import { PassiveAbilityCollectionCreator } from "../abilities/PassiveAbilityCollectionCreator";
import { ReactiveAbilityCollectionCreator } from "../abilities/ReactiveAbilityCollectionCreator";
import { SingleSelect } from "../../../components/inputs/selects/singleselect/SingleSelect";
import { ObjectSizeOptions } from "../../../entities/library/common/ObjectSize";
import { OccupancyEditor } from "./OccupancyEditor";

type Props = {
    vehicle: Vehicle;
    update: (vehicle: Vehicle) => unknown;
}

export const VehicleEditor = (props: Props) => {
    const { vehicle, update } = props;
    return (
        <>
            {vehicle.id &&
                <div className="form-field">
                    <label>Id</label>
                    <CopyableText>
                        {vehicle.id}
                    </CopyableText>
                </div>
            }
            <fieldset className="form-group">
                <legend>Basics</legend>
                <div className="form-field">
                    <label>Name</label>
                    <input type='text' value={vehicle.name}
                        onChange={(e) => update({ ...vehicle, name: e.target.value })} />
                </div>
                <div className="form-field">
                    <label>Description</label>
                    <textarea value={vehicle.description}
                        onChange={(e) => update({ ...vehicle, description: e.target.value })}></textarea>
                </div>
            </fieldset>

            <fieldset className="form-group">
                <div className="form-field">
                    <label>Movement</label>
                    <input type="number" value={vehicle.movement} min={0} step={1}
                        onChange={e => update({ ...vehicle, movement: parseInt(e.target.value) })} />
                </div>
                <div className="form-field">
                    <label>Health</label>
                    <input type="number" value={vehicle.health} min={1} step={1}
                        onChange={e => update({ ...vehicle, health: parseInt(e.target.value) })} />
                </div>
                <div className="form-field">
                    <label>Health Scale</label>
                    <input type="number" value={vehicle.healthScale} min={1} step={1}
                        onChange={e => update({ ...vehicle, healthScale: parseInt(e.target.value) })} />
                </div>
                <div className="form-field">
                    <label>Armor</label>
                    <input type="number" value={vehicle.armor} min={0} step={1}
                        onChange={e => update({ ...vehicle, armor: parseInt(e.target.value) })} />
                </div>
                <div className="form-field">
                    <label>Resilience</label>
                    <input type="number" value={vehicle.resilience} min={0} step={1}
                        onChange={e => update({ ...vehicle, resilience: parseInt(e.target.value) })} />
                </div>
                <div className="form-field">
                    <label>Weight</label>
                    <input type="number" value={vehicle.weight} min={1} step={1}
                        onChange={e => update({ ...vehicle, weight: parseFloat(e.target.value) })} />
                </div>
            </fieldset>

            <fieldset className="form-group">
                <div className="form-field">
                    <label>Size</label>
                    <SingleSelect options={ObjectSizeOptions} selection={vehicle.size}
                        onChange={size => update({ ...vehicle, size })} />
                </div>
                <div className="form-field">
                    <label>Occupancies</label>
                    <OccupancyEditor occupancies={vehicle.occupancies}
                        update={(occupancies) => update({ ...vehicle, occupancies })} />
                </div>
            </fieldset>

            <fieldset className='form-group'>
                <legend>Active Abilities</legend>
                <ActiveAbilityCollectionCreator actions={vehicle.actions ?? []}
                    update={(actions) => update({ ...vehicle, actions })} />
            </fieldset>
            <fieldset className='form-group'>
                <legend>Passive Abilities</legend>
                <PassiveAbilityCollectionCreator passives={vehicle.passives ?? []}
                    update={(passives) => update({ ...vehicle, passives })} />
            </fieldset>
            <fieldset className='form-group'>
                <legend>Reactive Abilities</legend>
                <ReactiveAbilityCollectionCreator reactions={vehicle.reactions ?? []}
                    onUpdate={(reactions) => update({ ...vehicle, reactions })} />
            </fieldset>
        </>
    )
}