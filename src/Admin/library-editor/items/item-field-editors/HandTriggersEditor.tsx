import React from "react";
import { MultiSelect } from "../../../../components/inputs/selects/multiselect/MultiSelect";
import { ThemedButton } from "../../../../components/inputs/buttons/ThemedButton";
import { DeclarableHands } from "../../../../entities/rolls/Roll";
import { HandTrigger } from "../../../../entities/rolls/HandTrigger";
import { MarkdownContainer } from "../../../../components/theming/MarkdownContainer";
import { CollapsibleSection } from "../../../../components/articles/CollapsibleSection";

type Props = {
    handTriggers: HandTrigger[];
    update: (handTriggers: HandTrigger[]) => void;
}

export const HandTriggersEditor: React.FC<Props> = (props: Props) => (
    <div className="form-field">
        {props.handTriggers?.map((ht, index) => <HandTriggerEditor handTrigger={ht}
            key={ht.handTypes.sort().join(',')} 
            update={(handTrigger: HandTrigger) => {
                props.handTriggers?.splice(index, 1, handTrigger);
                props.update(props.handTriggers);
            }}
            onDelete={() => {
                props.handTriggers?.splice(index, 1);
                props.update(props.handTriggers);
            }} />)}
        <ThemedButton onClick={() => props.update([...props.handTriggers, { handTypes: [], description: '' }])}>
            Add
        </ThemedButton>
    </div>
)

type SingleProps = {
    handTrigger: HandTrigger;
    update: (handTrigger: HandTrigger) => void;
    onDelete: () => void;
}

const HandTriggerEditor: React.FC<SingleProps> = (props: SingleProps) => {
    const { handTrigger, update, onDelete } = props;
    const options = Object.values(DeclarableHands).map(hand => ({ name: hand.name, value: hand.name }));
    return (
        <div className="form-field">
            <MultiSelect options={options} selections={handTrigger.handTypes}
                onChange={(handTypes) => {
                    update({ ...handTrigger, handTypes });
                }} />
            <textarea value={handTrigger.description}
                onChange={(e) => update({ ...handTrigger, description: e.target.value })}>
            </textarea>
            
            <CollapsibleSection header="Preview" expandedInitially>
                <MarkdownContainer>{handTrigger.description}</MarkdownContainer>
            </CollapsibleSection>

            <ThemedButton onClick={onDelete}>
                Delete
            </ThemedButton>
        </div>
    );
}