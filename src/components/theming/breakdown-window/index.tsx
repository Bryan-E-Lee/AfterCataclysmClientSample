import "./breakdown-window.scss";
import React from "react";
import { JSXChildProps } from "../../../entities/utils/jsx/Children";
import { ExternalClickDetector } from "../../../utils/events/ExternalClickDetector";
import { CloseIcon } from "../../icons";
import { CloseButton } from "../../inputs/buttons/CloseButton";

type Props = {
    className?: string;
    centered?: boolean;
    heading?: React.ReactNode;
    visible?: boolean;
    onScroll?: (e: React.UIEvent) => unknown;
    close: () => void;
} & JSXChildProps;

export const BreakdownWindow: React.FC<Props> = (props: Props) => {
    const { className, centered, heading, onScroll, close, children } = props;
    const visible = props.visible === undefined || props.visible;
    const overlayClass = visible
        ? "active"
        : "inactive";
    const tryToClose = () => {
        if (visible) {
            close();
        }
    }
    
    return (
        <div className={`overlay ${overlayClass} ${centered ? "centered" : ""}`}>
            <ExternalClickDetector className={`breakdown-window ${className || ""}`}
                onExternalClickDetected={tryToClose}
                onScroll={onScroll}>
                <header>
                    {heading}
                    <CloseButton close={tryToClose} />
                </header>
                {children}
            </ExternalClickDetector>
        </div>
    );
}