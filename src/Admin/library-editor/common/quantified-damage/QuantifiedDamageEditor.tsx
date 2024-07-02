import React from 'react';
import { SingleSelect } from '../../../../components/inputs/selects/singleselect/SingleSelect';
import { ThemedButton } from '../../../../components/inputs/buttons/ThemedButton';
import { AllDamageTypes, DamageType } from '../../../../entities/categorization/DamageType';
import { QuantifiedDamage } from '../../../../entities/categorization/QuantifiedDamage';

type Props = {
    quantifiedDamage: QuantifiedDamage;
    update: (quantifiedDamage: QuantifiedDamage) => void;
    delete: () => void;
};

type SelectableQuantifiedDamage = {
    name: DamageType;
    value: DamageType;
};

const DamageTypeOptions = AllDamageTypes.map<SelectableQuantifiedDamage>(
    (dt) => ({ value: dt, name: dt })
);

export const QuantifiedDamageEditor: React.FC<Props> = (props: Props) => {
    return (
        <div>
            <label className="thin">Quantity</label>
            <input type="number" min={0} value={props.quantifiedDamage.quantity ?? 0}
                onChange={(e) => props.update({ ...props.quantifiedDamage, quantity: parseInt(e.target.value) })} />
            <label className="thin">Type</label>
            <SingleSelect filterable options={DamageTypeOptions} selection={props.quantifiedDamage.damageType}
                onChange={(damageType) => props.update({ ...props.quantifiedDamage, damageType })}></SingleSelect>
            <ThemedButton onClick={() => props.delete()}>
                Delete
            </ThemedButton>
        </div>
    );
};
