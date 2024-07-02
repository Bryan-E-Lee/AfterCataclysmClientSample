import './damage-types.scss';
import React from "react";
import { DamageType } from "../../../../../../entities/categorization/DamageType";
import { QuantifiedDamage } from "../../../../../../entities/categorization/QuantifiedDamage";
import { BioIcon, CorrosiveIcon, CryoIcon, ElectromagneticIcon, ExplosiveIcon, HackIcon, PercussiveIcon, ThermalIcon } from '../../../../../icons';
import { InterpretCustomText } from '../../../../../../entities/utils/InterpretCustomText';
import { Character } from '../../../../../../entities/characters/Character';
import { nonEmpty } from '../../../../../../utils/TypeUtils';


const IconMap: {
    [key in DamageType]: JSX.Element
} = {
    'Percussive': <PercussiveIcon />,
    'Explosive': <ExplosiveIcon />,
    'Thermal': <ThermalIcon />,
    'Cryo': <CryoIcon />,
    'Electromagnetic': <ElectromagneticIcon />,
    'Corrosive': <CorrosiveIcon />,
    'Biological': <BioIcon />,
    'Hacking': <HackIcon />
}


type Props = {
    suite: QuantifiedDamage[];
    character?: Character;
    sourceId?: string;
    customDamageTexts?: string[];
    label?: string;
}

export const DamageTypeSuiteComponent: React.FC<Props> = (props: Props) => {
    const { suite, character, sourceId, customDamageTexts, label } = props;
    let filteredCustomDamageTexts = customDamageTexts ?? [];
    filteredCustomDamageTexts = filteredCustomDamageTexts.map(cdt => InterpretCustomText(cdt, character, sourceId)).filter<string>(nonEmpty);
    
    let customText = "";
    if (filteredCustomDamageTexts.any()) {
        customText = " + " + filteredCustomDamageTexts.join(" +");
    }
    return (
        <div className="damage-type-suite">
            {label && <label className="standout">{label}</label>}
            {suite.map(qd => (
                <DamageValue key={qd.damageType} value={qd.quantity} icon={IconMap[qd.damageType]} />
            ))}
            {customText}
        </div>
    );
}


type DamageValueProps = {
    value: number | undefined;
    icon: JSX.Element;
}

const DamageValue: React.FC<DamageValueProps> = (props: DamageValueProps) => {
    if(props.value != null) {
        return <span className='damage-type-suite-value'>{props.value}{props.icon}</span>
    }
    return null;
}