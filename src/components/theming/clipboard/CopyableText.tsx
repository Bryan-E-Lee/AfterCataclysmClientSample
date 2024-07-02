import './copyable-text.scss';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { ToastConfig } from '../../../config/ToastConfig';
import { ToastActions } from '../../../store/stores/toasts/Toasts.Actions';
import { CopyIcon } from '../../icons';

type Props = {
    children: string;
    description?: React.ReactNode;
    disabled?: boolean;
}

export const CopyableText: React.FC<Props> = (props: Props) => {
    const { children, description, disabled } = props;
    const dispatch = useDispatch();
    const textRef = useRef<HTMLSpanElement>(null);
    const copyToClipboard = async(): Promise<void> => {
        if (disabled || textRef.current == null) {
            return;
        }
        const permissionName = 'clipboard-write' as PermissionName; //fixes incorrect typing
        const result = await navigator.permissions.query({ name: permissionName });
        if (result?.state == 'granted' || result?.state == 'prompt') {
            navigator.clipboard.writeText(textRef.current.innerText);
            dispatch(ToastActions.toastInfo("Copied to Clipboard", ToastConfig.QuickDuration));
        }
        else {
            dispatch(ToastActions.toastError("Unable to Copy to Clipboard", ToastConfig.QuickDuration));
        }
    };
    return (
        <div className="copyable-text">
            <div>
                <span ref={textRef} className={`text ${disabled ? 'disabled' : 'enabled'}`}>{children}</span>
                <button className="interactable-button copy-button" title="Copy to Clipboard" onClick={copyToClipboard} disabled={disabled}><CopyIcon /></button>
            </div>
            <div className="description">{description}</div>
        </div>
    );
}