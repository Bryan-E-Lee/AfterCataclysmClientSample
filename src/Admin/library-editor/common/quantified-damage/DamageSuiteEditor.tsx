import React from "react";
import { ThemedButton } from "../../../../components/inputs/buttons/ThemedButton";
import { QuantifiedDamage, GenerateQuantifiedDamageKey } from "../../../../entities/categorization/QuantifiedDamage";
import { QuantifiedDamageEditor } from "./QuantifiedDamageEditor";

type Props = {
    damageSuite: QuantifiedDamage[];
    update: (damageSuite: QuantifiedDamage[]) => void;
}

export const DamageSuiteEditor: React.FC<Props> = (props: Props) => {
    return (
        <div>
            {props.damageSuite?.map((qd: QuantifiedDamage, index: number) => (
                <QuantifiedDamageEditor key={GenerateQuantifiedDamageKey(qd)} quantifiedDamage={qd}
                    update={(qd) => {
                        if(props.damageSuite == null) {
                            return;
                        }
                        props.damageSuite.splice(index, 1, qd);
                        props.update(props.damageSuite);
                    }}
                    delete={() => {
                        if (props.damageSuite == null) {
                            return;
                        }
                        props.damageSuite.splice(index, 1);
                        props.update(props.damageSuite);
                    }} />
            ))}
            <ThemedButton onClick={() => props.update([...props.damageSuite, { quantity: 1, damageType: 'Percussive' }])}>
                Add
            </ThemedButton>
        </div>
    );
}