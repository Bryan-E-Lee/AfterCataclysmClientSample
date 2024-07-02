import './die.scss';
import React from "react";
import { JSXChildProps } from "../../entities/utils/jsx/Children";

type DieProps = {
    className?: string;
    big?: boolean;
    onClick?: () => unknown;
    children: JSXChildProps;
};

export const Die: React.FC<DieProps> = (props: DieProps) => {
    const dieSizeClass = props.big
        ? 'big'
        : '';
    const customClassName = props.className ?? '';
    return (
        <span className={`die ${dieSizeClass} ${customClassName}`} onClick={props.onClick ?? (() => {})}>
            <span className='die-face'>{props.children}</span>
        </span>
    );
}