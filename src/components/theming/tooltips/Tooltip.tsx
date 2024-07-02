import './tooltip.scss';
import React from "react";
import { JSXChildProps } from "../../../entities/utils/jsx/Children"
import { ExternalClickDetector } from "../../../utils/events/ExternalClickDetector";
import { CloseButton } from "../../inputs/buttons/CloseButton";

type Props = {
    visible: boolean;
    close: () => unknown;
    style?: React.CSSProperties;
} & JSXChildProps;

export const Tooltip = (props: Props) => {
    const { close, visible, style, children } = props;
    const className = `tooltip ${visible ? 'visible' : 'hidden'}`;
    return (
        <div className={className} style={style}>
            <CloseButton close={close} />
            <ExternalClickDetector onExternalClickDetected={close}>
                {children}
            </ExternalClickDetector>
        </div>
    );
}