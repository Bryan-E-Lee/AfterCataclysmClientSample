import "./loader.scss";
import React from "react";

type Props = {
    dimension?: number;
    textSized?: boolean;
    children?: React.ReactNode;
}

export const Loader = (props: Props) => {
    let { dimension, textSized = false, children } = props;
    dimension = dimension ?? (textSized ? 24 : 64);
    const contentStyle = {
        "--loader-dimension": `${dimension}px`

    } as React.CSSProperties;
    return (
        <div className="loader">
            <div className="loader-icon" style={contentStyle}></div>
            <div className="loader-text">{children}</div>
        </div>
    );
}