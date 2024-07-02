import './themed-checkbox.scss';
import React from "react"
import { CheckedIcon, CheckedOutlineIcon, UncheckedIcon, UncheckedOutlineIcon } from "../../icons";

type Props = {
    checked: boolean;
    disabled?: boolean;
    setChecked: (checked: boolean) => unknown;
    suppressBubble?: boolean;
}

export const ThemedCheckbox: React.FC<Props> = (props: Props) => {
    const { checked, disabled, setChecked, suppressBubble } = props;
    const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (disabled) {
            return;
        }
        
        setChecked(!checked);
        if (suppressBubble) {
            e.stopPropagation();
        }
    }
    return (
        <div className={`themed-checkbox ${checked ? 'checked' : 'unchecked'} ${disabled ? 'disabled' : 'enabled'}`}
            onClick={onClick}>
            <div className="icon-wrapper">
                {checked ? <CheckedIcon /> : <UncheckedIcon />}
            </div>
            <div className="icon-wrapper outlines">
                {checked ? <CheckedOutlineIcon /> : <UncheckedOutlineIcon />}
            </div>
           <input type="checkbox" checked={checked} readOnly />
        </div>
    );
}