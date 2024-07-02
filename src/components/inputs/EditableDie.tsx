import './editable-die.scss';
import React, { useState } from "react";
import { Die } from '../figures/Die';
import { DieFace } from '../../entities/rolls/Roll';
import { ExternalClickDetector } from '../../utils/events/ExternalClickDetector';

type OnChangeFunction = (value: DieFace) => void;

type Props = {
    faceValue: DieFace | null;
    onChange: OnChangeFunction;
    disabled?: boolean;
}

export const EditableDie = (props: Props) => {
    const { faceValue, onChange, disabled } = props;
    const [expanded, setExpanded] = useState(false);

    const className = `die-picker ${expanded ? 'expanded' : 'constricted'}`;

    const createSelectDieFunction = (value: DieFace) => {
        return () => {
            if (!disabled) {
                onChange(value);
                setExpanded(false);
            }
        }
    }
    
    const createDieFace = (value: DieFace) => <div className='die-option' onClick={createSelectDieFunction(value)}>{value}</div>;

    return (
        <div className={`editable-die ${disabled ? 'disabled' : 'enabled'}`}>
            <Die big className="interactable" onClick={() => setExpanded(true)}>
                {faceValue || '?'}
            </Die>
            <ExternalClickDetector className={className} onExternalClickDetected={() => setExpanded(false)}>
                {createDieFace(1)}
                {createDieFace(2)}
                {createDieFace(3)}
                {createDieFace(4)}
                {createDieFace(5)}
                {createDieFace(6)}
            </ExternalClickDetector>
        </div>
    )
}
