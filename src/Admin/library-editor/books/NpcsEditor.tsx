import React from "react";
import { Npc } from "../../../entities/library/books/NPC";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { getUniqueIdentifier } from "../../../utils/GUID";
import { CollapsibleSection } from "../../../components/articles/CollapsibleSection";
import { SingleSelect } from "../../../components/inputs/selects/singleselect/SingleSelect";
import { SelectableOption } from "../../../components/inputs/selects/SelectableOption";
import { useSelector } from "react-redux";
import { AdminState } from "../../store/stores/AdminState";
import { MarkdownContainer } from "../../../components/theming/MarkdownContainer";

type Props = {
    npcs: Npc[];
    onUpdate: (npcs: Npc[]) => unknown;
}

const CreateDefaultNPC: () => Npc = () => ({
    id: getUniqueIdentifier(),
    name: "",
    description: ""
});

export const NpcsEditor = (props: Props) => {
    const { npcs, onUpdate } = props;

    const addNPC = () => {
        onUpdate([...npcs, CreateDefaultNPC()])
    }
    const createNPCUpdater = (index: number) => {
        return (npc: Npc) => {
            npcs.splice(index, 1, npc);
            onUpdate([...npcs]);
        }
    }
    const deleteNPC = (index: number) => {
        npcs.splice(index, 1);
        onUpdate([...npcs]);
    }
    return (
        <>
            {npcs.map((npc, i) => <NpcEditor key={npc.id} npc={npc} onUpdate={createNPCUpdater(i)} onDelete={() => deleteNPC(i)} />)}
            <ThemedButton onClick={addNPC}>
                Add NPC
            </ThemedButton>
        </>
    );
}

type NpcProps = {
    npc: Npc;
    onUpdate: (npc: Npc) => unknown;
    onDelete: () => unknown;
}

const NpcEditor = (props: NpcProps) => {
    const { npc, onUpdate, onDelete } = props;
    const enemies = useSelector((app: AdminState) => app.library.enemies);
    const enemyOptions = enemies.map(enemy => ({ name: enemy.name, value: enemy.id })) as SelectableOption<string | null>[];
    return ( 
        <CollapsibleSection header={npc.name}>
            <ThemedButton onClick={onDelete}>Delete</ThemedButton>

            <div className="form-field">
                <label>Name</label>
                <input type="text" value={npc.name} onChange={e => onUpdate({ ...npc, name: e.target.value })} />
            </div>

            <div className="form-field">
                <label>Description</label>
                <textarea value={npc.description} onChange={e => onUpdate({ ...npc, description: e.target.value })} />
                <CollapsibleSection header="Preview" expandedInitially>
                    <MarkdownContainer>
                        {npc.description}
                    </MarkdownContainer>
                </CollapsibleSection>
            </div>

            <div className="form-field">
                <label>Stat Block</label>
                <SingleSelect allowNull options={enemyOptions} onChange={(selection: string | null) => onUpdate({ ...npc, statBlockId: selection ?? undefined })}></SingleSelect>
            </div>
        </CollapsibleSection>
    )
}