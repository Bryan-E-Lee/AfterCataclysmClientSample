import React, { useState } from "react";
import { JSXChildProps } from "../../../entities/utils/jsx/Children";
import { Tooltip } from "./Tooltip";

type Props = {
    tooltipContent: React.ReactNode
} & JSXChildProps;

type State = {
    visible: boolean;
    x?: string;
    y?: string;
}

export const TooltipContent = (props: Props) => {
    const [state, setState] = useState<State>({
        visible: false,
        x: '0px',
        y: '0px'
    });
    const { children, tooltipContent } = props;
    const showTooltip = (event: React.MouseEvent) => setState(state => {
        const newState = { ...state, visible: true }
        if (window.innerWidth > 581) {
            newState.x = event.clientX + 'px';
            newState.y = (window.innerHeight - event.clientY) + 'px';
        }
        else {
            delete newState.x;
            delete newState.y;
        }
        return newState;
    });
    const hideTooltip = () => setState(state => ({ ...state, visible: false }));
    return (
        <div className="tooltip-container" onMouseOver={showTooltip} onMouseOut={hideTooltip}>
            {children}
            <Tooltip close={hideTooltip} visible={state.visible} style={{left: state.x, bottom: state.y}}>
                {tooltipContent}
            </Tooltip>
        </div>
    );
}