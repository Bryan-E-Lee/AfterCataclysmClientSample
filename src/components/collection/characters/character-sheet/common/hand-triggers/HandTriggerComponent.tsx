import './hand-trigger.scss';
import React from "react"
import { HandTypeLabel } from "./HandTypeLabel";
import { HandTrigger } from '../../../../../../entities/rolls/HandTrigger';
import { Weapon } from '../../../../../../entities/library/items/weapons/Weapon';
import { HandTypeName } from '../../../../../../entities/rolls/Roll';
import { AmmoTriggerSource } from '../../../../../../entities/library/items/mods/Ammo';
import { MarkdownContainer } from '../../../../../theming/MarkdownContainer';

type Props = { weapon?: Weapon, handTrigger: HandTrigger }

export const HandTriggerComponent: React.FC<Props> = (props: Props) => {
    const { handTrigger } = props;
    return (
        <div className="hand-trigger">
            <label>
                {handTrigger.handTypes.map(ht => <HandTypeLabel key={ht} handTypeName={ht} />)}
            </label>
            <MarkdownContainer>{handTrigger.description}</MarkdownContainer>
        </div>
    );
}

type WeaponTriggerProps = { weapon: Weapon, handTypes: HandTypeName[], sources: AmmoTriggerSource[] }

export const WeaponHandTriggerComponent: React.FC<WeaponTriggerProps> = (props: WeaponTriggerProps) => {
    const { weapon, handTypes, sources } = props;
    return (
        <div className="hand-trigger">
            <label>
                {handTypes.map(ht => <HandTypeLabel key={ht} handTypeName={ht} />)}
            </label>
            <div>
                {sources.map(s => (
                    <div key={s.name + s.description}>
                        {s.name != weapon.name && <label className="standout">{s.name}</label>}
                        <MarkdownContainer>{s.description}</MarkdownContainer>
                    </div>
                ))}
            </div>
        </div>
    );
}