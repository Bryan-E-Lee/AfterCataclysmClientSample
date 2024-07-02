import React from "react"
import { useDispatch } from "react-redux";
import { Toast } from "../../entities/toasts/Toasts"
import { ToastActions } from "../../store/stores/toasts/Toasts.Actions"

type Props = {
    toast: Toast;
}

export const ToastComponent: React.FC<Props> = (props: Props) => {
    const dispatch = useDispatch();
    return (
        <div className={`toast ${props.toast.toastType}`}>
            <i className='fas fa-exclamation-circle'></i>
            <p>{props.toast.message}</p>
            <button onClick={() => dispatch(ToastActions.dismissToast(props.toast))}>
                <span className='material-symbols-outlined'>cancel</span>
            </button>
        </div>
    );
}