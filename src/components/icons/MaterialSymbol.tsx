import React from "react";
import { JSXChildProps } from "../../entities/utils/jsx/Children";

type Props = {
    className?: string;
    filled?: boolean;
} & JSXChildProps;

export const MaterialSymbol: React.FC<Props> = (props: Props) => {
    const { className, filled } = props;
    return (
        <span className={`material-symbols-outlined ${filled ? 'filled' : ''} site-icon ${className ?? ''}`}>
            {props.children}
        </span>
    );
}