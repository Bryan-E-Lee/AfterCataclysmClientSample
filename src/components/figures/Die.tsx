import './die.scss';
import React from "react";
import { JSXChildProps } from "../../entities/utils/jsx/Children";

type DieProps = {
    className?: string;
    big?: boolean;
    rolling?: boolean;
    onClick?: () => unknown;
    children: JSXChildProps;
};

export const Die: React.FC<DieProps> = (props: DieProps) => {
    const { className, big, rolling, onClick, children } = props;
    const dieSizeClass = big ? 'big' : '';
    const rollingClass = rolling ? 'rolling' : 'not-rolling';
    const customClassName = className ?? '';
    return (
        <span className={`die ${dieSizeClass} ${rollingClass} ${customClassName}`} onClick={onClick ?? (() => {})}>
            <span className='die-face set-face'>{children}</span>
            <span className='die-face rolling-face'></span>
        </span>
    );
}