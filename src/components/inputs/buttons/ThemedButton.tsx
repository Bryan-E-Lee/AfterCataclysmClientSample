import './themed-button.scss';
import * as React from 'react';
import { JSXChildProps } from '../../../entities/utils/jsx/Children';

type Props = {
    title?: string;
    className?: string;
    disabled?: boolean;
    active?: boolean;
    playSound?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => any;
    submit?: boolean;
} & JSXChildProps;

export const ThemedButton: React.FC<Props> = (props: Props) => {
    const { title, className, disabled,
        active, playSound, onClick,
        submit, children } = props;
    return (
        <button className={`themed-button ${className ?? 'normal'} ${active ? 'active' : 'inactive'}`}
            onClick={onClick ?? (() => {})} disabled={disabled || (!onClick && disabled !== false)}
            type={submit ? 'submit' : 'button'} title={title}>
            {children}
        </button>
    )
}