import React from "react";
import "./confirm.scss";
import { JSXChildProps } from "../../../entities/utils/jsx/Children";
import { ThemedButton } from "../../inputs/buttons/ThemedButton";

type Props = {
    onConfirm: () => unknown;
    onCancel: () => unknown;
    confirmText?: React.ReactNode;
    cancelText?: React.ReactNode;
} & JSXChildProps;

export const Confirm = (props: Props) => {
    const { onConfirm, onCancel, confirmText, cancelText, children } = props;
    return (
        <div className="overlay active">
            <div className="confirmation-window">
                <div className="content">
                    {children}
                </div>
                <div className="confirmation-controls">
                    <ThemedButton onClick={onConfirm}>{confirmText ?? "Confirm"}</ThemedButton>
                    <ThemedButton onClick={onCancel}>{cancelText ?? "Cancel"}</ThemedButton>
                </div>
            </div>
        </div>
    )
}