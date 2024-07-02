import './toasts.scss';
import React from "react";
import { IToastableApp } from "../../store/stores/toasts/Toasts.State";
import { ToastComponent } from "./Toast";
import { useSelector } from 'react-redux';

export const ToastContainer = () => {
    const toasts = useSelector((app: IToastableApp) => app.toast.toasts);
    return (
        <div className='toast-container'>
            {toasts.map(toast => <ToastComponent key={toast.id} toast={toast} />)}
        </div>
    )
}