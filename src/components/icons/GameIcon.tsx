import React, { CSSProperties } from "react";

type Props = {
    children: string;
    style?: CSSProperties;
    className?: string;
    title?: string;
}

export const GameIcon = (props: Props) => <i className={`game-icon game-icon-${props.children} ${props.className ?? ''}`} style={props.style} title={props.title}></i>;