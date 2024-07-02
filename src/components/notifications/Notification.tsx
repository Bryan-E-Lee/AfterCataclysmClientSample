import "./notification.scss";
import React from "react";
import { JSXChildProps } from "../../entities/utils/jsx/Children"
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from "../icons";

type Props = {
    className: string;
} & JSXChildProps;

const NotificationComponent = (props: Props) => {
    const { className, children } = props;
    return <div className={`notification ${className}`}>{children}</div>;
}

export const InfoNotification = (props: JSXChildProps) => (
    <NotificationComponent className="info">
        <InfoIcon className="primary-icon" />{props.children}
    </NotificationComponent>
)

export const WarningNotification = (props: JSXChildProps) => (
    <NotificationComponent className="warning">
        <WarningIcon className="primary-icon" />{props.children}
    </NotificationComponent>
)

export const ErrorNotification = (props: JSXChildProps) => (
    <NotificationComponent className="error">
        <ErrorIcon className="primary-icon" />{props.children}
    </NotificationComponent>
)

export const SuccessNotification = (props: JSXChildProps) => (
    <NotificationComponent className="success">
        <SuccessIcon className="primary-icon" />{props.children}
    </NotificationComponent>
)