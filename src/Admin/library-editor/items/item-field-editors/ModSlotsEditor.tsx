import React from "react"
import { MultiSelect } from "../../../../components/inputs/selects/multiselect/MultiSelect";
import { ThemedButton } from "../../../../components/inputs/buttons/ThemedButton";
import { ModSlotInitializer } from "../../../../entities/library/items/mods/ModSlot";

type Props = {
    slots: ModSlotInitializer[];
    slotTypes: string[];
    update: (slots: ModSlotInitializer[]) => void;
}

export const ModSlotsEditor: React.FC<Props> = (props: Props) => (
    <div>
        {props.slots.map((modSlot, index) => (
            <ModSlotEditor key={modSlot.slotTypes.join(',') + index} modSlot={modSlot} slotTypes={props.slotTypes}
                update={(modSlot: ModSlotInitializer) => {
                    props.slots.splice(index, 1, modSlot);
                    props.update(props.slots);
                }}
                delete={() => {
                    props.slots.splice(index, 1);
                    props.update(props.slots);
                }} />
        ))}
        <ThemedButton onClick={() => props.update([...props.slots, { slotTypes: [] }])}>
            Add
        </ThemedButton>
    </div>
)


type SlotProps = {
    modSlot: ModSlotInitializer;
    slotTypes: string[];
    update: (modSlot: ModSlotInitializer) => void;
    delete: () => void;
}

const ModSlotEditor: React.FC<SlotProps> = (props: SlotProps) => {
    const { modSlot, slotTypes } = props;
    const modSlotOptions = slotTypes.map(st => ({
        name: st,
        value: st
    }));
    return (
        <div>
            <MultiSelect options={modSlotOptions} selections={modSlot.slotTypes}
                onChange={(slotTypes) => props.update({ slotTypes })} />
            <ThemedButton onClick={props.delete}>
                Delete
            </ThemedButton>
        </div>
    );
}