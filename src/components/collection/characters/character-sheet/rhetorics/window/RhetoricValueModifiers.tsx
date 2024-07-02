import React from "react";
import { Character } from "../../../../../../entities/characters/Character";
import { Rhetoric } from "../../../../../../entities/library/socials/Rhetoric";

type Props = { character: Character; rhetoric: Rhetoric; }

export const RhetoricValueModifiers: React.FC<Props> = (props: Props) => {
    const { character, rhetoric } = props;
    const valueModifiers = character.getValueModifiers(rhetoric.name);
    return (
        <>
            {valueModifiers.map(vm => (
                <div key={vm.source} className='value-modifier'>
                    <label>{vm.source}</label>
                    <div className='value'>{vm.modify(character)}</div>
                </div>
            ))}
        </>
    );
}