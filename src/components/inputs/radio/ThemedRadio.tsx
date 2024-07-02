import './themed-radio.scss';
import React from "react";

type RadioOption = {
    name: string;
    display: React.ReactNode;
    disabled?: boolean;
}

type Props<T extends RadioOption> = {
    className?: string;
    options: T[];
    selected?: T;
    onChange?: (selected: T) => unknown;
    showName?: boolean;
    nullable?: boolean;
}

export const ThemedRadio = <T extends RadioOption>(props: Props<T>) => {
    let { className, options, selected, onChange, showName, nullable } = props;

    nullable = nullable ?? false;
    if (!nullable && selected == null) {
        throw new Error("Received a null base selection ")
    }

    const createClickEvent = (option: T) => () => {
        if (onChange != null) {
            onChange(option);
        }
    }
    return (
        <div className={`themed-radio ${className ?? ""}`}>
            <div className="options">
                {options.map(o => (
                    <button key={o.name} onClick={createClickEvent(o)} title={o.name} disabled={o.disabled}
                        className={`option ${selected == o ? 'selected' : 'unselected'}`}>
                        {o.display}
                    </button>
                ))}
            </div>
            {showName && selected != null && <label>{selected.name}</label>}
        </div>
    );
}